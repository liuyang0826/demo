(function removeElement (selector) {
  let target = document.querySelector(selector);
  let parentNodes = new Map();
  let getParent = node => node && (parentNodes.set(node, true), getParent(node.parentNode));
  getParent(target);
  document.querySelectorAll("*").forEach(node => !parentNodes.get(node) && node.parentNode.removeChild(node));
  parentNodes.forEach((_, node) => {
    node.className = "";
    node.style = "";
    node.id = "";
  });
  target.style.cssText = "width: 400px;height: 300px;position: fixed;top: 0;right: 0;bottom: 0;left: 0;margin: auto;";
  document.querySelector("html").style.background = "#000"
})("video");
