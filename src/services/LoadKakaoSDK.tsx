const API_KEY = "4f4cb0b458e667379a33fd098500f59e";

const loadKakaoMapsSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps?.LatLng) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        window.kakao.maps.LatLng
          ? resolve()
          : reject(new Error("Kakao Maps components are not available"));
      });
    };
    script.onerror = () =>
      reject(new Error("Failed to load the Kakao Maps SDK"));
    document.head.appendChild(script);
  });
};

export default loadKakaoMapsSDK;
