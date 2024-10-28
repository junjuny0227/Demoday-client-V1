import { useEffect, useRef } from "react";
import styled from "styled-components";
import loadKakaoMapsSDK from "../services/LoadKakaoSDK";

const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; // 상호작용 가능하도록 z-index 조정
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
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const { latitude, longitude } = await getLocate();
        const kakaoMapManager = KakaoMapManager.getInstance();

        await kakaoMapManager.initMap();
        mapRef.current = kakaoMapManager.getMap();

        if (mapRef.current) {
          const center = new window.kakao.maps.LatLng(latitude, longitude);
          mapRef.current.setCenter(center); // 지도의 중심을 현재 위치로 설정
        }
      } catch (error) {
        console.error("위치 정보를 가져오는 데 문제가 발생했습니다:", error);
      }
    };

    initMap(); // 비동기 함수 호출
  }, []);

  return <MapWrapper id="map"></MapWrapper>;
};

export default MapApi;
