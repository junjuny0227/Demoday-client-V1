import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

// kakao.d.ts
export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapOptions {
  center: LatLng;
  level: number;
}

export interface Map {
  setCenter: (latlng: LatLng) => void;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => LatLng; // 리턴 타입을 LatLng 인터페이스로 명시
        Map: new (container: HTMLElement, options: MapOptions) => Map;
        load: (callback: () => void) => void;
      };
    };
  }
}

function MapApi() {
  const mapRef = useRef<Map | null>(null);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);

  const getLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;
          setUserLat(latitude);
          setUserLng(longitude);
        },
        (error: GeolocationPositionError) => {
          console.error(
            `위치 정보를 가져오는 데 오류가 발생했습니다: ${error.message}`
          );
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  const initMap = () => {
    if (userLat !== null && userLng !== null) {
      const container = document.getElementById("map");
      const options: MapOptions = {
        center: { lat: userLat, lng: userLng }, // LatLng 객체 생성
        level: 3,
      };

      // Kakao Maps API를 통해 LatLng 객체 생성
      const latLng = new window.kakao.maps.LatLng(
        options.center.lat,
        options.center.lng
      );

      const map = new window.kakao.maps.Map(container as HTMLElement, {
        center: latLng,
        level: options.level,
      });

      mapRef.current = map;
    }
  };

  useEffect(() => {
    getLocate();
  }, []);

  useEffect(() => {
    if (userLat !== null && userLng !== null) {
      window.kakao.maps.load(initMap);
    }
  }, [userLat, userLng]);

  return <MapWrapper id="map"></MapWrapper>;
}

export default MapApi;
