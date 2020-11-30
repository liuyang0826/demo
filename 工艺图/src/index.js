import { Root } from "./Root";
import { Rect } from "./element/Rect";
import { Line } from "./element/Line";
import { makeRectModel } from "./models";

const data = [
  // {
  //   id: 1,
  //   type: "rect",
  //   shape: {
  //     x: 100,
  //     y: 100,
  //     width: 200,
  //     height: 100
  //   },
  //   lines: [
  //     {
  //       id: 3,
  //       isStart: true,
  //       isVertical: true,
  //       isBottom: true
  //     }
  //   ]
  // },
  // {
  //   id: 2,
  //   type: "rect",
  //   shape: {
  //     x: 500,
  //     y: 400,
  //     width: 200,
  //     height: 100
  //   },
  //   lines: [
  //     {
  //       id: 3,
  //       isStart: false,
  //       isVertical: false,
  //       isBottom: false
  //     }
  //   ]
  // },
  // {
  //   id: 3,
  //   type: "line",
  //   shape: {
  //     points: [
  //       [250.5, 200.5],
  //       [250.5, 600.5],
  //       [400.5, 600.5],
  //       [400.5, 450.5],
  //       [500.5, 450.5],
  //     ]
  //   },
  //   isStartVertical: true,
  //   isEndVertical: false
  // },
];

const root = new Root(document.querySelector("#root"));

data.forEach((item) => {
  let el;
  switch (item.type) {
    case "rect":
      renderRect(item);
      break;
    case "line":
      el = new Line(item);
      root.add(el);
      break;
  }
});

function renderRect (data) {
  let rect = new Rect(data);
  root.add(rect);
}

root.on("dragover", (e) => {
  e.event.preventDefault();
});

root.on("drop", (e) => {
  let rect = new Rect(makeRectModel(e.offsetX, e.offsetY));
  root.add(rect);
});

document.getElementById("drawLine").onclick = function () {
  root.startDrawLine();
};
document.getElementById("move").onclick = function () {
  root.startRectMove();
};
