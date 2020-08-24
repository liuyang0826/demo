const hour = 60 * 60 * 1000;
export const config = {
  width: 0,
  height: 0,
  dateRangeMS: 3 * hour,
  lineSpacePX: 100,
  padding: Object.freeze({
    left: 100,
    right: 40,
    top: 100,
    bottom: 100
  }),
  rectHeight: 32,
  startTime: new Date().getTime() - 0.8 * hour,
  splitTime: new Date().getTime(),
  scale: 1,
  scaleSpeed: 0.04,
  advanceSpaceTime: 1.5 * 60 * 1000,
  lineDotWidth: 10,
  iconSize: 24
};
