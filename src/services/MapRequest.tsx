const loadKakaoMapsSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=facaacdcb43def40e1f3b13289bce1e5&autoload=false";
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (window.kakao.maps.LatLng) {
          resolve();
        } else {
          reject(new Error("Kakao Maps components are not available"));
        }
      });
    };
    script.onerror = () => reject(new Error("Failed to load the Kakao Maps SDK"));
    document.head.appendChild(script);
  });
};

export default loadKakaoMapsSDK;
