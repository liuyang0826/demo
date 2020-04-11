import processTpl from "./process-tpl";
import { getInlineCode, insertExternalStyle, insertInlineStyle, insertPrefetchLink } from "./utils";
import fetch from "./xhr";

const styleCache = {};
const embedHTMLCache = {};
const prefetchCache = {};

function getDomain (url) {
  try {
    // URL 构造函数不支持使用 // 前缀的 url
    const href = new URL(url.startsWith("//") ? "".concat(location.protocol).concat(url) : url);
    return href.origin;
  } catch (e) {
    return "";
  }
}

// css样式仅仅是从每个应用复制
function _getExternalStyleSheets (styles) {
  return Promise.all(styles.map((styleLink) => {
    if (!styleCache[styleLink]) {
      styleCache[styleLink] = true;
      if (styleLink.startsWith("<")) {
        // if it is inline style
        return insertInlineStyle(getInlineCode(styleLink));
      } else {
        // external styles
        return insertExternalStyle(styleLink);
      }
    }
    return true;
  }));
} // for prefetch

function _getPrefetchList (PrefetchList) {
  return Promise.all(PrefetchList.map((href) => {
    if (!prefetchCache[href]) {
      prefetchCache[href] = true;
      return insertPrefetchLink(href);
    }
    return true;
  }));
}

export function importEntry (url) {
  return embedHTMLCache[url] || (embedHTMLCache[url] = fetch(url)
  .then((response) => response)
  .then((html) => {
    const $processTpl = processTpl(html, getDomain(url));
    const template = $processTpl.template;
    const scripts = $processTpl.scripts;
    const entry = $processTpl.entry;
    const styles = $processTpl.styles;
    const prefetchList = $processTpl.prefetchList;
    return {
      template,
      getExternalStyleSheets: function getExternalStyleSheets () {
        return _getExternalStyleSheets(styles);
      },
      importScripts: async function importScripts () {
        for (let i = 0; i < scripts.length; i++) {
          await window.System.import(scripts[i]);
        }
        return window.System.import(entry);
      },
      getPrefetchList: function getPrefetchList () {
        return _getPrefetchList(prefetchList);
      },
    };
  }));
}
