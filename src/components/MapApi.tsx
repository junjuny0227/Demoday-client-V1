import { useEffect, useRef } from "react";
import loadKakaoMapsSDK from "../services/MapRequest";

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
        LatLng: new (lat: number, lng: number) => LatLng; // 리턴 타입을 LatLng 인터페이스로 명시
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
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps SDK not available.");
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(37.483034, 126.902435),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container as HTMLElement, options);
    mapRef.current = map;
  };

  useEffect(() => {
    loadKakaoMapsSDK()
      .then(initMap)
      .catch((error) => console.error("Failed to load Kakao Maps:", error));
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
}

export default MapApi;
