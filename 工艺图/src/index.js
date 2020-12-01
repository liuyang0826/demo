import { Root } from "./Root";
import { Rect } from "./elements/Rect";
import { Line } from "./elements/Line";
import { RectDOM } from "./elements/dom/RectDOM";
import { RectZR } from "./elements/zr/RectZR";
import { types } from "./Element";

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

const root = new Root({
  el: document.querySelector("#root"),
  oncontextmenu (item) {
    switch (item.type) {
      case types.rect:
        console.log(item);
        item.setImage("/1.png");
        break;
    }
  }
});

data.forEach((item) => {
  let el;
  switch (item.type) {
    case "rect":
      el = new Rect(data);
      break;
    case "line":
      el = new Line(item);
      break;
  }
  root.add(el);
});

let type;
document.getElementById("div").ondragstart = function () {
  type = "div";
};

document.getElementById("zr").ondragstart = function () {
  type = "zr";
};

root.on("dragover", (e) => {
  e.event.preventDefault();
});

root.on("drop", (e) => {
  let rect;
  switch (type) {
    case "div":
      rect = new RectDOM({
        shape: {
          x: e.offsetX,
          y: e.offsetY
        }
      });
      break;
    case "zr":
      rect = new RectZR({
        shape: {
          x: e.offsetX,
          y: e.offsetY
        }
      });
      break;
  }
  console.log(rect);
  root.add(rect);
});

document.getElementById("drawLine").onclick = function () {
  root.startDrawLine();
};
document.getElementById("move").onclick = function () {
  root.startRectMove();
};
document.getElementById("resize").onclick = function () {
  root.startRectResize();
};

const json = [
  {
    name: "张三"
  }
]
document.getElementById("download").onclick = function () {
  const blob = new File([JSON.stringify(json)], "test.json", {
    type: "text/plain",
    lastModified: new Date()
  });
  const a = document.createElement("a");
  a.href = (window.URL || window.webkitURL).createObjectURL(blob);
  a.download = decodeURIComponent("test1.json");
  a.dispatchEvent(new MouseEvent("click"));
};
