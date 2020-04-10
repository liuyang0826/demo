import { getInlineCode } from "./utils";
const URL_REGEX = "(?:(https?):\/\/)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";
const ALL_SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const SCRIPT_TAG_REGEX = /<(script)\s+((?!type=["']?text\/ng-template["']?[\s+.*>|>]).)*?>.*?<\/\1>/i;
const SCRIPT_SRC_REGEX = new RegExp(`.*\\ssrc=["']?(${URL_REGEX})["']?[\\s+.*>|>]`);
const SCRIPT_ENTRY_REGEX = /.*\sentry\s*.*/;
const LINK_TAG_REGEX = /<(link)\s+.*?>/gi;
const STYLE_TYPE_REGEX = /\s+rel=["']?stylesheet["']?[\s+|>]/;
const PREFETCH_TYPE_REGEX = /\s+rel=["']?prefetch["']?[\s+|>]/;
const HREF_REGEX = new RegExp(`.*\\shref=["']?(${URL_REGEX})["']?[\\s+.*>|>]`);
const HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;

function hasProtocol(url) {
  return url.startsWith("//") || url.startsWith("http://") || url.startsWith("https://");
}

function getBaseDomain(url) {
  return url.endsWith("/") ? url.substr(0, url.length - 1) : url;
}

export const genLinkReplaceSymbol = (linkHref) => {
  return "<!-- link ".concat(linkHref, " replaced by import-html-entry -->");
};
export const genScriptReplaceSymbol = (scriptSrc) => {
  return "<!-- script ".concat(scriptSrc, " replaced by import-html-entry -->");
};
export let inlineScriptReplaceSymbol = "<!-- inline scripts replaced by import-html-entry -->";
/**
 * parse the script link from the template
 * 1. collect stylesheets
 * 2. use global eval to evaluate the inline scripts
 * @param tpl
 * @param domain
 * @stripStyles whether to strip the css links
 * @returns {{template: void | string | *, scripts: *[], entry: *}}
 */

export default function processTpl(tpl, domain) {
  let scripts = [];
  const styles = [];
  const prefetchList = [];
  let entry= null;
  const template = tpl
  /*
  remove html comment first
  */
  .replace(HTML_COMMENT_REGEX, "").replace(LINK_TAG_REGEX, (match) => {
    const href = match.match(HREF_REGEX);
    if (href) {
      // css link
      const styleType = !!match.match(STYLE_TYPE_REGEX);
      if (styleType) {
        const styleHref = href[1];
        let newHref = styleHref;
        if (styleHref && !hasProtocol(styleHref)) {
          // 处理一下使用相对路径的场景
          newHref = getBaseDomain(domain) + (styleHref.startsWith("/") ? styleHref : "/".concat(styleHref));
        }
        styles.push(newHref);
        return genLinkReplaceSymbol(newHref);
      }
      // prefetch link
      const prefetchType = !!match.match(PREFETCH_TYPE_REGEX);
      if (prefetchType) {
        const prefetchHref = href[1];
        let newHref = prefetchHref;
        if (prefetchHref && !hasProtocol(prefetchHref)) {
          newHref = getBaseDomain(domain) + (prefetchHref.startsWith("/") ? prefetchHref : "/".concat(prefetchHref));
        }
        prefetchList.push(newHref);
        return genLinkReplaceSymbol(newHref);
      }
    }
    return match;
  }).replace(ALL_SCRIPT_REGEX, (match) => {
    // if it is a external script

    if (SCRIPT_TAG_REGEX.test(match)) {
      /*
      collect scripts and replace the ref
      */
      const matchedScriptEntry = match.match(SCRIPT_ENTRY_REGEX);
      const matchedScriptSrcMatch = match.match(SCRIPT_SRC_REGEX);
      let matchedScriptSrc = matchedScriptSrcMatch && matchedScriptSrcMatch[1];

      if (entry && matchedScriptEntry) {
        throw new SyntaxError("You should not set multiply entry script!");
      } else {
        // append the domain while the script not have an protocol prefix
        if (matchedScriptSrc && !hasProtocol(matchedScriptSrc)) {
          matchedScriptSrc = getBaseDomain(domain) + (matchedScriptSrc.startsWith("/") ? matchedScriptSrc : "/".concat(matchedScriptSrc));
        }

        entry = entry || matchedScriptEntry && matchedScriptSrc;
      }

      if (matchedScriptSrc) {
        scripts.push(matchedScriptSrc);
        return genScriptReplaceSymbol(matchedScriptSrc);
      }

      return match;
    } else {

      const code = getInlineCode(match); // remove script blocks when all of these lines are comments.

      const isPureCommentBlock = code.split(/[\r\n]+/).every((line) => {
        return !line.trim() || line.trim().startsWith("//");
      });

      if (!isPureCommentBlock) {
        scripts.push(match);
      }

      return inlineScriptReplaceSymbol;
    }
  });
  scripts = scripts.filter((script) => {
    // filter empty script
    return !!script;
  });
  return {
    template,
    scripts,
    styles,
    prefetchList,
    // set the last script as entry if have not set
    entry: entry || scripts[scripts.length - 1],
  };
}
