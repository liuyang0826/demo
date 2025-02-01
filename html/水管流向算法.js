const nodes = [
  { on: true },
  { on: true },
  { on: false },
  { on: false },
  { on: true }
];

const edges = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 1, target: 4 },
  { source: 2, target: 4 },
  { source: 3, target: 4 },
  { source: 4 },
];

const edgeTargets = {};
edges.forEach(edge => {
  delete edge.on;
  if (edge.target === undefined) return;
  if (!edgeTargets[edge.target]) {
    edgeTargets[edge.target] = [];
  }
  edgeTargets[edge.target].push(edge);
});

const nodeMap = {};
nodes.forEach((node, index) => {
  nodeMap[index] = node.isBranch || node.on;
});

const isOpen = edge => {
  if (edge.on !== undefined) return edge.on;
  const edges = edgeTargets[edge.source];
  edge.on = edges
    ? edges.filter(edge => nodeMap[edge.target] && isOpen(edge)).length !== 0
    : edge.source === undefined || nodeMap[edge.source];
  return edge.on;
};

edges.forEach(edge => {
  if (edge.target !== undefined) return
  isOpen(edge);
});

console.log(edges);
