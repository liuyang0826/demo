export function createConfig ({ width, height }) {
  return Object.freeze({
    width,
    height,
    dateRangeMS: 180 * 60 * 1000,
    lineSpacePX: 100,
    padding: Object.freeze({
      left: 100,
      right: 40,
      top: 100,
      bottom: 100
    }),
    rectHeight: 50,
    splitTime: new Date().getTime(),
    scaleSpeed: 0.04,
    advanceSpaceTime: 1.5 * 60 * 1000,
    lineDotWidth: 10
  });
}
