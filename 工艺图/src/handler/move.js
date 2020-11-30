export function startMove (root) {
  root.isMoveRunning = true;
  root.elements.forEach((element) => {
    move(element);
  });
}

export function endRectMove (root) {
  if (!root.isMoveRunning) return;
  root.isMoveRunning = false;
  root.elements.forEach((element) => {
    element.offMove();
  });
}

function move (element) {
  let prevEvent;
  const root = element._$root;
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

  element.offMove = () => {
    element.on("mousedown", mouseDown);
  };
}
