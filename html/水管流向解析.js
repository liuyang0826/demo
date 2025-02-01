const fs = require('fs');
const content = fs.readFileSync('./flows.json');
const flows = JSON.parse(content).filter(d => d.type === 'line');

const equals = (a, b) => a[0] === b[0] && a[1] === b[1];

const intersections = [];

flows.forEach(flow1 => {
  const point = flow1.points.at(-1);
  if (intersections.some(d => equals(d, point))) return;

  const count = flows.filter(flow2 => flow1 !== flow2 && equals(point, flow2.points.at(0))).length;
  if (count) {
    point.isBranch = count > 1;
    intersections.push(point);
  } else {
    const count = flows.filter(
      flow2 =>
        flow1 !== flow2 &&
        (equals(flow1.points.at(-1), flow2.points.at(0)) ||
          equals(flow1.points.at(-1), flow2.points.at(-1)) ||
          equals(flow1.points.at(0), flow2.points.at(0)) ||
          equals(flow1.points.at(0), flow2.points.at(-1)))
    ).length;
    if (!count) {
      intersections.push(flow1.points.at(0));
    }
  }
});

const nodes = intersections.map(point => {
  return { isBranch: point.isBranch };
});
const edges = flows.map(flow => {
  const source = intersections.findIndex(intersection => equals(intersection, flow.points.at(0)));
  const target = intersections.findIndex(intersection => equals(intersection, flow.points.at(-1)));
  return {
    source: source === -1 ? undefined : source,
    target: target === -1 ? undefined : target,
  };
});

fs.writeFileSync(
  './nodes.txt',
  `[
  ${nodes.map(node => `{ ${node.isBranch ? 'isBranch: true' : 'on: true'} },`).join('\r\n  ')}  
]`,
  'utf-8'
);
fs.writeFileSync(
  './edges.txt',
  `[
  ${edges
    .map(
      edge =>
        `{ ${['source', 'target']
          .filter(key => edge[key] !== undefined)
          .map(key => `${key}: ${edge[key]}`)
          .join(', ')} },`
    )
    .join('\r\n  ')}  
]`,
  'utf-8'
);
