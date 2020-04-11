import { navigateToUrl } from "single-spa";
import { loading } from "../progress";
import Vue from "vue";
import VueRouter from "vue-router";

export function injectShare ({ appPathMap }) {
  window.qTouch = {
    navigateToUrl: function (url) {
      navigateToUrl(process.env.BASE_URL + url);
    },
    appPathMap: appPathMap,
    basePath: process.env.BASE_URL + "",
    getBaseTypeByCode: function (code) {
      let baseTypeCodeMapStr = localStorage.getItem("baseTypeCodeMap");
      if (baseTypeCodeMapStr) {
        let baseTypeCodeMap = JSON.parse(baseTypeCodeMapStr);
        if (baseTypeCodeMap) {
          return baseTypeCodeMap[code] || false;
        }
      }
      return false;
    },
    loading: loading
  };
  window.Vue = Vue;
  window.VueRouter = VueRouter;
}
