import { Element } from "../Element";
import { Circle as ZrCircle} from "zrender";

export class Circle extends Element {
  render () {
    this.instance = new ZrCircle({
      shape: this.shape
    })
  }

  addToRoot (root) {
    root.zr.add(this.instance)
  }
}
