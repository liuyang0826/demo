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
      data: plan
    });
    plan.rectView = rect;
    group.add(rect);

    rect.on("mouseover", () => {
      plan.subPlanList.forEach((subPlan) => {
        subPlan.rectView.setStyle({
          fill: "#0f0",
          textFill: "#fff",
        });
      });
      if (plan.lineRightView) {
        plan.lineRightView.rightData.subPlanList.forEach((subPlan) => {
          subPlan.rectView.setStyle({
            fill: "#0f0",
            textFill: "#fff",
          });
        });
      }
      if (plan.lineLeftView) {
        plan.lineLeftView.leftData.subPlanList.forEach((subPlan) => {
          subPlan.rectView.setStyle({
            fill: "#0f0",
            textFill: "#fff",
          });
        });
      }
    }).on("mouseout", () => {
      plan.subPlanList.forEach((subPlan) => {
        subPlan.rectView.setStyle({
          fill: "#fff",
          textFill: "#f00",
        });
      });
      if (plan.lineRightView) {
        plan.lineRightView.rightData.subPlanList.forEach((subPlan) => {
          subPlan.rectView.setStyle({
            fill: "#fff",
            textFill: "#f00",
          });
        });
      }
      if (plan.lineLeftView) {
        plan.lineLeftView.leftData.subPlanList.forEach((subPlan) => {
          subPlan.rectView.setStyle({
            fill: "#fff",
            textFill: "#f00",
          });
        });
      }
    });

    return function update () {
      const shape = makeShapeByPlan(plan, plan.xIndex);
      rect.setShape(shape);
    };
  }
}
