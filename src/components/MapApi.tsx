import { useEffect, useRef } from "react";

//kakao.d.ts
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
        LatLng: (lat: number, lng: number) => LatLng; // 리턴 타입을 LatLng 인터페이스로 명시
        Map: new (container: HTMLElement, options: MapOptions) => Map;
        load: (callback: () => void) => void;
      };
    };
  }
}

function MapApi() {
  const mapRef = useRef<Map | null>(null);

  const initMap = () => {
    const container = document.getElementById("map");
    const options: MapOptions = {
      center: { lat: 37.483034, lng: 126.902435 }, // LatLng 객체 생성
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
  };

  useEffect(() => {
    window.kakao.maps.load(initMap);
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
}

export default MapApi;
