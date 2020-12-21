import { Element, types } from "../Element";
import { addRectMove } from "../handler/rectMove";
import { rootState } from "../Root";
import { addDrawLine } from "../handler/drawLine";
import { makeRectVertexes } from "../helpers";
import { addRectResize, elementFollowResize, lineFollowElement, vertexFollowElement } from "../handler/rectResize";

export class Rect extends Element {
  constructor (opts) {
    super(opts);
    this.type = types.rect;
    this.lines = this.lines || [];
    this.vertexes = this.vertexes || [];
  }

  init () {
    this.shape = {
      x: 0,
      y: 0,
      width: 200,
      height: 100
    };
  }

  render () {}

  addToRoot (root) {
    super.addToRoot(root);
    switch (root.state) {
      case rootState.rectMove:
        this.startMove();
        break;
      case rootState.drawLine:
        this.startDrawLine();
        break;
      case rootState.rectResize:
        this.startResize();
        break;
    }
  }

  removeFromRoot (root) {
    super.removeFromRoot(root);
    this.removeListener();
  }

  // 跟随鼠标
  follow (offset) {
    super.follow(offset);
    this.shape.x += offset.x;
    this.shape.y += offset.y;
    this.setShape(this.shape);

    const elementMap = this.root.elementMap;
    this.lines.forEach((item) => {
      const line = elementMap[item.id];
      line.isFollowStart = item.isStart;
      line.follow(offset);
    });
  }

  removeListener () {
    this.endMove();
    this.endDrawLine();
    this.endResize();
  }

  // 开始移动
  startMove () {
    this.endMove = addRectMove(this);
  }

  endMove () {}

  // 开始画线
  startDrawLine () {
    this.endDrawLine = addDrawLine(this);
  }

  endDrawLine () {}

  // 开始缩放
  startResize () {
    this.offClick = addRectResize(this);
  }

  endResize () {
    this.offClick && this.offClick();
    this.vertexes.forEach((vertex) => {
      this.root.remove(vertex);
    });
    this.vertexes = [];
  }

  // 添加顶点
  addVertexes () {
    makeRectVertexes(this).forEach((point, index) => {
      const vertex = this.makeVertex({
        shape: {
          cx: point[0],
          cy: point[1],
        },
        index,
        rect: this
      });
      this.vertexes.push(vertex);
      this.root.add(vertex);
      vertex.startResize();
    });
  }

  makeVertex (opts) {}

  followVertex (vertex, offset) {
    elementFollowResize(this, vertex, offset);
    this.setShape(this.shape);
    vertexFollowElement(this);
    lineFollowElement(this, vertex, offset);
  }

  setImage (image) {
    this.image = image;
  }
}
