import { Line, Text } from "../zrender";
import { config } from "../config";

export function backgroundRender (zr, data) {
  const padding = config.padding;

  data.forEach((item, index) => {
    let curY = ~~(index * config.lineSpacePX + padding.top);
    const line = new Line({
      shape: {
        x1: padding.left,
        y1: curY,
        x2: config.width + padding.left,
        y2: curY
      },
      style: {
        stroke: "#000",
        lineWidth: 2
      },
      zlevel: 0,
      silent: true
    });
    zr.add(line);

    const text = new Text({
      position: [50, curY],
      style: {
        text: item.name,
        textLineHeight: 2,
        fontSize: 12
      },
      zlevel: 0,
      silent: true
    });
    zr.add(text);
  });
}
