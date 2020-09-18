import { init, Circle, Polyline } from "zrender";
const root = document.getElementById("root");
const zr = init(root);
const polylinePoints = [[0.5, 10.5], [100.5, 10.5], [100.5, 300.5], [300.5, 200.5], [500.5, 300.5]];
const polyline = new Polyline({
  shape: { points: polylinePoints }
});
zr.add(polyline);
const circle = new Circle({
  shape: {
    cx: polylinePoints[0][0],
    cy: polylinePoints[0][1],
    r: 6
  },
  style: {
    fill: "red"
  }
});
zr.add(circle);
circleAnimate(circle, polylinePoints, 240);
function circleAnimate (circle, points, speed) {
  const animation = circle.animate("shape", true);
  let delay = 0;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const distance = Math.sqrt((prev[0] - cur[0])**2 + (prev[1] - cur[1])**2)
    delay += distance / (speed / 1000)
    animation.when(delay, {
      cx: cur[0],
      cy: cur[1],
    });
  }
  animation.start();
}

console.log(polyline);
