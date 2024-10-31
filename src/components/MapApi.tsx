import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import loadKakaoMapsSDK from "../services/LoadKakaoSDK";

const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0; // 상호작용 가능하도록 z-index 조정
`;

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapOptions {
  center: LatLng;
  level: number;
  draggable: true; // boolean으로 수정
  scrollwheel: true; // boolean으로 수정
}

export interface Map {
  setCenter: (latlng: LatLng) => void;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => LatLng;
        Map: new (container: HTMLElement, options: MapOptions) => Map;
        load: (callback: () => void) => void;
      };
    };
  }
}

const KakaoMapManager = (() => {
  let instance: {
    map: Map | null;
    initMap: () => Promise<void>;
    getMap: () => Map | null;
  } | null = null;

  function createInstance() {
    let map: Map | null = null;

    async function initMap(): Promise<void> {
      try {
        await loadKakaoMapsSDK();
        const container = document.getElementById("map");
        if (!container) {
          console.error("Map container not found.");
          return;
        }
        if (!window.kakao || !window.kakao.maps) {
          console.error("Kakao Maps SDK is not loaded.");
          return;
        }

        const options: MapOptions = {
          center: new window.kakao.maps.LatLng(37.483034, 126.902435),
          level: 3,
          draggable: true,
          scrollwheel: true,
        };

        map = new window.kakao.maps.Map(container as HTMLElement, options);
      } catch (error) {
        console.error("Failed to load Kakao Maps:", error);
      }
    }

    function getMap(): Map | null {
      return map;
    }

    return {
      map,
      initMap,
      getMap,
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const getLocate = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error: GeolocationPositionError) => {
          console.error(
            `위치 정보를 가져오는 데 오류가 발생했습니다: ${error.message}`
          );
          reject(error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      reject(new Error("Geolocation is not supported"));
    }
  });
};

const MapApi: React.FC = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const { latitude, longitude } = await getLocate();
        console.log(latitude);
        console.log(longitude);
        const kakaoMapManager = KakaoMapManager.getInstance();

        await kakaoMapManager.initMap();
        mapRef.current = kakaoMapManager.getMap();
        if (mapRef.current) {
          const center = new kakao.maps.LatLng(latitude, longitude);
          mapRef.current.setCenter(center); // 지도의 중심을 현재 위치로 설정

          // 마커 생성
          const initialMarker = new kakao.maps.Marker({
            position: center,
            map: mapRef.current,
          });
          setMarker(initialMarker); // 마커를 상태에 저장
        }
      } catch (error) {
        console.error("위치 정보를 가져오는 데 문제가 발생했습니다:", error);
      }
    };

    initMap(); // 비동기 함수 호출
  }, []); // 한 번만 실행

  useEffect(() => {
    if (mapRef.current && marker) {
      // 클릭 이벤트 리스너 추가
      const mapClickListener = (mouseEvent: kakao.maps.event.MouseEvent) => {
        const latLng = mouseEvent.latLng;
        console.log(latLng);

        // 마커 위치 이동
        marker.setPosition(latLng);
      };

      kakao.maps.event.addListener(mapRef.current, "click", mapClickListener);

      // 클린업 함수: 이벤트 리스너 제거
      return () => {
        kakao.maps.event.removeListener(
          mapRef.current,
          "click",
          mapClickListener
        );
      };
    }
  }, [marker]); // marker가 설정된 후 실행

  return <MapWrapper id="map"></MapWrapper>;
};

export default MapApi;
