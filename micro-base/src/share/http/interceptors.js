// 配置请求拦截器
import * as Code from "./code";

export const requestInterceptor = (config) => {
  qTouch.loading.start();
  let accessToken = qTouch.cookieUtils.get(qTouch.accessTokenKey);
  if (accessToken) {
    if (!config.headers.withoutToken) {
      config.headers.accessToken = "Bearer " + accessToken;
    }
  } else {
    qTouch.navigateToUrl(`${qTouch.appPathMap.base}/login${location.search}`);
  }
  delete config.headers.withoutToken;
  return config;
};

export const requestErrorInterceptor = (error) => {
  throw error;
};

export const responseInterceptor = (response) => {
  qTouch.loading.done();
  if (response.data.code === Code.TOKEN_EXPIRED) {
    qTouch.navigateToUrl(`${qTouch.appPathMap.base}/login${location.search}`);
  }
  return response;
};

export const responseErrorInterceptor = (error) => {
  qTouch.loading.done();
  let response = error.response;
  if (response) {
    if (response.status >= 500) {
      console.error("服务器错误")
    }
  }
  throw error;
};
