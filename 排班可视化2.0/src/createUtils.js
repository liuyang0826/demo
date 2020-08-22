export function createUtils ({ config: { padding, rectHeight, lineSpacePX } }) {
  function makeShapeByPlan (plan, xIndex, startTime, ms2px) {
    const _startTime = plan.startTime;
    const _endTime = plan.endTime;
    const rect = {
      x: (_startTime - startTime) * ms2px,
      y: xIndex * lineSpacePX + padding.top - rectHeight / 2,
      width: ~~((_endTime - _startTime) * ms2px),
      height: rectHeight,
      r: [2, 2, 2, 2]
    };
    return rect;
  }

  return {
    makeShapeByPlan
  };
}
