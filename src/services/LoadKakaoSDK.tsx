import axios from "axios";

const loadKakaoMapsSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
      resolve();
      return;
    }

    axios
      .get("https://dapi.kakao.com/v2/maps/sdk.js?appkey=facaacdcb43def40e1f3b13289bce1e5&autoload=false")
      .then((response) => {
        eval(response.data);
        window.kakao.maps.load(() => {
          if (window.kakao.maps.LatLng) {
            resolve();
          } else {
            reject(new Error("Kakao Maps components are not available"));
          }
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default loadKakaoMapsSDK;
