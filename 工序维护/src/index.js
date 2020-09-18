import { init, Rect, Line } from "zrender";

const zr = init(document.getElementById("root"));

const data = [
  {
    x: 180,
    y: 100,
    type: 1,
    enableType: 2,
    data: [
      { id: "1-1", name: "高炉#1", targets: ["2-1", "2-2"] },
      { id: "1-2", name: "高炉#2", targets: ["2-1", "2-2"] },
      { id: "1-3", name: "高炉#3", targets: ["2-1", "2-2", "2-3", "2-4"] },
      { id: "1-4", name: "高炉#4", targets: ["2-3", "2-4"] },
      { id: "1-5", name: "高炉#5", targets: ["2-3", "2-4"] },
    ],
  },
  {
    x: 260,
    y: 200,
    type: 2,
    enableType: 3,
    data: [
      { id: "2-1", name: "转炉#1", targets: ["3-1", "3-2"] },
      { id: "2-2", name: "转炉#2", targets: ["3-1", "3-2"] },
      { id: "2-3", name: "转炉#3", targets: ["3-3", "3-4"] },
      { id: "2-4", name: "转炉#4", targets: ["3-3", "3-4"] }
    ],
  },
  {
    x: 260,
    y: 300,
    type: 3,
    enableType: 4,
    data: [
      { id: "3-1", name: "精炼#1", targets: ["4-1"] },
      { id: "3-2", name: "精炼#2", targets: ["4-2"] },
      { id: "3-3", name: "精炼#3", targets: ["4-3"] },
      { id: "3-4", name: "精炼#4", targets: ["4-4"] }
    ],
  },
  {
    x: 260,
    y: 400,
    type: 4,
    enableType: 5,
    data: [
      { id: "4-1", name: "连铸#1" },
      { id: "4-2", name: "连铸#2" },
      { id: "4-3", name: "连铸#3" },
      { id: "4-4", name: "连铸#4" }
    ],
  },
  {
    x: 100,
    y: 500,
    type: 5,
    data: [
      { id: "5-1", name: "2#轧钢" },
      { id: "5-2", name: "3#轧钢" },
      { id: "5-3", name: "A线" },
      { id: "5-4", name: "B线" },
      { id: "5-5", name: "小棒" },
      { id: "5-6", name: "高棒" }
    ]
  }
];

const cache = {};
const rects = [];

data.forEach((type) => {
  type.data.forEach((item, index) => {
    const rect = new Rect({
      shape: {
        x: type.x + index * 160,
        y: type.y,
        width: 100,
        height: 40,
        r: [4, 4, 4, 4]
      },
      style: {
        fill: "red",
        text: item.name,
        textFill: "#fff"
      },
      silent: true,
      data: {
        type: type.type,
        id: item.id
      }
    });
    zr.add(rect);
    rects.push(rect);
    if (item.id) {
      cache[item.id] = rect;
    }
  });
});

data.forEach((type) => {
  type.data.forEach((item) => {
    if (Array.isArray(item.targets)) {
      item.targets.forEach((target) => {
        const startShape = cache[item.id].shape;
        const targetShape = cache[target].shape;
        const line = new Line({
          shape: {
            x1: startShape.x + startShape.width / 2,
            y1: startShape.y + startShape.height,
            x2: targetShape.x + targetShape.width / 2,
            y2: targetShape.y,
          },
          data: {
            startType: type.type,
            enableType: type.enableType,
            startShape,
            targetShape
          }
        });
        zr.add(line);
      });
    }
  });
});

let currentLine;
let isStart = false;
zr.on("mousedown", (e) => {
  currentLine = e.target;
  if (currentLine) {
    const shape = currentLine.shape;
    // currentLine
    isStart = (shape.y1 + shape.y2) / 2 > e.offsetY;
  }
});
zr.on("mousemove", (e) => {
  if (!currentLine) return;
  currentLine.setShape(isStart ? {
    x1: e.offsetX,
    y1: e.offsetY,
  } : {
    x2: e.offsetX,
    y2: e.offsetY,
  });
});
zr.on("mouseup", (e) => {
  if (!currentLine) return;
  const target = rects.find(d => {
    return d.getBoundingRect().contain(e.offsetX, e.offsetY);
  });
  if (target && currentLine.data.enableType === target.data.type) {
    const shape = target.shape;
    currentLine.setShape(isStart ? {
      x1: shape.x + shape.width / 2,
      y1: shape.y + shape.height,
    } : {
      x2: shape.x + shape.width / 2,
      y2: shape.y,
    });
  } else {
    const shape = isStart ? currentLine.data.startShape : currentLine.data.targetShape;
    currentLine.setShape(isStart ? {
      x1: shape.x + shape.width / 2,
      y1: shape.y + shape.height,
    } : {
      x2: shape.x + shape.width / 2,
      y2: shape.y,
    });
  }
  currentLine = null;
});
