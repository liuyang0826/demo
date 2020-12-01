import { RectVertex } from "../RectVertex";
import { platforms } from "../../Root";
import { mixin } from "../../helpers";
import { EventFulZR } from "../../event/EventFulZR";
import { Circle as ZRCircle } from "zrender";

export class RectVertexZR extends RectVertex {
  constructor (opts) {
    super(opts);
    EventFulZR.call(this)
    this.platform = platforms.zr
  }

  init () {
    super.init();
    this.style = {
      lineWidth: 1,
      stroke: "#000",
      text: "",
      fontSize: 16,
      textFill: "#999",
      fill: "#fff"
    };
  }

  render () {
    super.render();
    this.el = new ZRCircle({
      shape: this.shape,
      style: this.style
    });
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.setShape(shape);
  }
}

mixin(RectVertexZR, EventFulZR);
