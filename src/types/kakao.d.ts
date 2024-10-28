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
