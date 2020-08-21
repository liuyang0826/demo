export function createUtils ({ config: { padding, rectHeight, lineSpacePX } }) {
  function makeShapeByPlan (plan, xIndex, startTime, ms2px) {
    const _startTime = plan.startTime;
    const _endTime = plan.endTime;
    const rect = {
      x: (_startTime - startTime) * ms2px,
      y: xIndex * lineSpacePX + padding.top - rectHeight / 2,
      width: ~~((_endTime - _startTime) * ms2px),
      height: rectHeight,
      r: [4, 4, 4, 4]
    };
    let subStartTime = _startTime;
    rect.subRectList = (plan.subPlanList || []).map((plan) => {
      const rect = {
        x: (subStartTime - startTime) * ms2px,
        y: xIndex * lineSpacePX + padding.top - rectHeight / 2,
        w: ~~((_endTime - subStartTime) * ms2px),
        h: rectHeight
      };
      subStartTime += plan.duration;
      return rect;
    });
    return rect;
  }

  return {
    makeShapeByPlan
  };
}
