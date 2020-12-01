import { Element, types } from "../Element";
import { addVertexResize } from "../handler/rectResize";

export class RectVertex extends Element {
  constructor (opts) {
    super(opts);
    this.platform = "";
  }

  get type () {
    return types.rectVertex;
  }

  init () {
    super.init();
    this.shape = {
      cx: 0,
      cy: 0,
      r: 4
    };
  }

  follow (offset) {
    super.follow(offset);
    this.shape.cx += offset.x;
    this.shape.cy += offset.y;
    this.setShape(this.shape);
    this.rect.followVertex(this, offset)
  }

  removeFromRoot (root) {
    super.removeFromRoot(root);
    this.endResize();
  }

  startResize () {
    this.endResize = addVertexResize(this)
  }

  endResize () {}
}
