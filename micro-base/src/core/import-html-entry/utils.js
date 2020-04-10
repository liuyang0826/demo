export function getInlineCode(match) {
  const start = match.indexOf(">") + 1;
  const end = match.lastIndexOf("<");
  return match.substring(start, end);
}

export async function insertInlineStyle(styleSheet) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(styleSheet));
  document.head.appendChild(style);
}

export async function insertExternalStyle(styleLink) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.onload = resolve;
    link.onerror = reject;
    link.href = styleLink;
    document.head.appendChild(link);
  });
}

export async function insertPrefetchLink(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.onload = resolve;
    link.onerror = reject;
    link.href = href;
    document.head.appendChild(link);
  });
}
