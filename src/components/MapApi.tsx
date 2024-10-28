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

const MapApi: React.FC = () => {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadKakaoMapsSDK();
        const container = document.getElementById("map");
        if (!container || !window.kakao || !window.kakao.maps) {
          console.error("Kakao Maps SDK not available or map container not found.");
          return;
        }

        const options: MapOptions = {
          center: new window.kakao.maps.LatLng(37.483034, 126.902435),
          level: 3,
        };

        const map: Map = new window.kakao.maps.Map(container as HTMLElement, options);
        mapRef.current = map;
      } catch (error) {
        console.error("Failed to load Kakao Maps:", error);
      }
    };

    initMap();
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default MapApi;
