import { makeShapeByPlan } from "../utils";
import { Rect } from "../zrender";

export function subPlansRender (data, group) {
  const updates = [];
  data.forEach((item) => {
    let current = item.head;
    while (current) {
      renderSubPlans(current);
      current = current.next;
    }
  });

  return function update () {
    updates.forEach((update) => {
      update();
    });
  };

  function renderSubPlans (plan) {
    plan.subPlanList.forEach((subPlan) => {
      updates.push(renderSubPlan(subPlan, plan));
    });
  }

  function renderSubPlan (subPlan, plan) {
    const shape = makeShapeByPlan(subPlan, plan.xIndex);
    const rect = new Rect({
      shape: shape,
      silent: true,
      zlevel: 0,
      data: subPlan,
      style: {
        text: subPlan.name,
        stroke: "red",
        lineWidth: 2,
        fontSize: 12,
        textFill: "red",
        // fill: plan.startTime < config.splitTime ? "#ccc" : "orange",
        fill: "#fff"
      }
    });
    subPlan.rectView = rect;
    group.add(rect);
    return function update() {
      const shape = makeShapeByPlan(subPlan, plan.xIndex);
      rect.setShape(shape);
    }
  }
}
