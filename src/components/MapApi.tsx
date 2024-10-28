import { useEffect, useRef } from "react";
import loadKakaoMapsSDK from "../services/LoadKakaoSDK";

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

const MapApi: React.FC = () => {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const kakaoMapManager = KakaoMapManager.getInstance();
    kakaoMapManager.initMap().then(() => {
      mapRef.current = kakaoMapManager.getMap();
    });
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default MapApi;
