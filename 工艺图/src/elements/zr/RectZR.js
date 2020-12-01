import { Rect } from "../Rect";
import { platforms } from "../../Root";
import { EventFulZR } from "../../event/EventFulZR";
import { mixin } from "../../helpers";
import { Rect as ZRRect, Image as ZRImage } from "zrender";
import { RectVertexZR } from "./RectVertexZR";

export class RectZR extends Rect {
  constructor (opts) {
    super(opts);
    this.platform = platforms.zr;
    EventFulZR.call(this);
  }

  init () {
    super.init();
    this.style = {
      lineWidth: 1,
      stroke: "#000",
      text: "",
      fontSize: 16,
      textFill: "#999",
      fill: "rgba(0,0,0,0)"
    };
  }

  render () {
    super.render();
    this.shape.x = ~~(this.shape.x) + 0.5;
    this.shape.y = ~~(this.shape.y) + 0.5;
    this.el = this.image ? new ZRImage({
      style: {
        ...this.shape,
        image: this.image
      }
    }) : new ZRRect({
      shape: this.shape,
      style: this.style
    });
  }

  setShape (shape) {
    super.setShape(shape);
    this.image ? this.el.setStyle(this.shape) : this.el.setShape(this.shape);
  }

  makeVertex (opts) {
    super.makeVertex(opts);
    return new RectVertexZR(opts);
  }

  setImage (image) {
    super.setImage(image);
    const root = this.root;
    this.root.remove(this);
    this.render();
    root.add(this);
  }
}

mixin(RectZR, EventFulZR);
