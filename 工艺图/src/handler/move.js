import { rootState } from "../Root";

export function startRectMove (root) {
  if (root.state === rootState.move) return;
  root.state = rootState.move;
  root.elements.forEach((element) => {
    element.type === "rect" && element.startMove()
  });
}

export function endRectMove (root) {
  if (root.state !== rootState.move) return;
  root.state = rootState.off;
  root.elements.forEach((element) => {
    element.type === "rect" && element.endMove();
  });
}

export function addMove (element) {
  const root = element._$root;
  let prevEvent;
  element.on("mousedown", mouseDown);

  function mouseDown (e) {
    prevEvent = e;
    root.on("mousemove", mousemove);
    root.on("mouseup", mouseup);

    function mousemove (e) {
      const offset = {
        x: e.offsetX - prevEvent.offsetX,
        y: e.offsetY - prevEvent.offsetY,
      };
      element.follow(offset);
      prevEvent = e;
    }

    function mouseup () {
      root.off("mousemove", mousemove);
      root.off("mouseup", mouseup);
    }
  }

  return () => {
    element.off("mousedown", mouseDown);
  };
}
