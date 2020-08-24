import { makeShapeByPlan } from "../utils";
import { Rect } from "../zrender";

// 计划
export function plansRender (data, group) {
  const updates = [];
  data.forEach((item) => {
    let current = item.head;
    while (current) {
      const update = renderPlan(current);
      updates.push(update);
      current = current.next;
    }
  });

  return function update () {
    updates.forEach((update) => {
      update();
    });
  };

  function renderPlan (plan) {
    const shape = makeShapeByPlan(plan, plan.xIndex);
    const rect = new Rect({
      shape: shape,
      draggable: true,
      zlevel: 0,
      data: plan,
      style: {
        // text: plan.name,
        stroke: "red",
        lineWidth: 2,
        fontSize: 12,
        textFill: "red",
        // fill: plan.startTime < config.splitTime ? "#ccc" : "orange",
        fill: "#fff"
      }
    });
    plan.rectView = rect;
    group.add(rect);

    return function update () {
      const shape = makeShapeByPlan(plan, plan.xIndex);
      rect.setShape(shape);
    }
  }
}
