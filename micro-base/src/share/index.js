import { navigateToUrl } from "single-spa";
import { loading } from "../progress";
import { AMapUtils } from "./utils/AMapUtils";
import { adapterVue } from "./adapters/adapterVue";
import { http } from "./http";
import cookieUtils from "js-cookie";
import Vue from "vue";
import VueRouter from "vue-router";
import ELEMENT from "element-ui";

export function injectShare ({ appPathMap, accessTokenKey }) {
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
    loading,
    AMapUtils,
    Adapters: {
      vue: adapterVue
    },
    cookieUtils,
    http,
    accessTokenKey
  };
  window.Vue = Vue;
  window.VueRouter = VueRouter;
  window.ELEMENT = ELEMENT;
}
