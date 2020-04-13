const cdnConfig = {
  AMap: "https://webapi.amap.com/maps?v=1.4.11&key=fbc043611829448a8d799c0a5fef544a&plugin=AMap.Geocoder,AMap.PlaceSearch&callback=onAMapLoad",
  AMapUI: "https://webapi.amap.com/ui/1.0/main-async.js?v=1.0.11"
};

function loadAMap(aMapKey) {
  return new Promise((resolve, reject) => {
    const src = `https://webapi.amap.com/maps?v=1.4.11&key=${aMapKey || "fbc043611829448a8d799c0a5fef544a"}&plugin=AMap.Geocoder,AMap.PlaceSearch&callback=onAMapLoad`;
    if (window.AMap) {
      return resolve();
    }
    const script = document.createElement("script");
    window.onAMapLoad = () => {
      if (window.initAMapUI) {
        window.initAMapUI();
      }
      resolve();
    };
    script.onerror = reject;
    script.src = src;
    document.head.appendChild(script);
  });
}

function loadAMapUI() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      return resolve();
    }
    const script = document.createElement("script");
    script.onload = () => {
      if (window.AMap) {
        window.initAMapUI();
      }
      resolve();
    };
    script.onerror = reject;
    script.src = cdnConfig.AMapUI;
    document.head.appendChild(script);
  });
}

export const AMapUtils = {
  loadAMap,
  loadAMapUI
};
