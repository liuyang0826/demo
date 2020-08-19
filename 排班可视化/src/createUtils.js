export function createUtils ({ config: { width, padding, dateRangeMS, rectHeight, lineSpacePX } }) {
  function makeRectByPlan (plan, xIndex, startTime, ms2px) {
    const _startTime = plan.startTime;
    const _endTime = plan.endTime;
    return {
      x: (_startTime - startTime) * ms2px,
      y: xIndex * lineSpacePX + padding.top - rectHeight / 2,
      w: ~~((_endTime - _startTime) * ms2px),
      h: rectHeight
    };
  }

  return {
    makeRectByPlan
  }
}
