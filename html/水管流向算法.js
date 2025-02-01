const nodes = [
  { id: 1, on: true },
  { id: 2, on: true },
  { id: 3, on: false },
  { id: 4 },
  { id: 5, on: true },
];

const edges = [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
  { source: 2, target: 5 },
  { source: 3, target: 5 },
  { source: 4, target: 5 },
  { source: 5 },
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
nodes.forEach(node => {
  nodeMap[node.id] = node.on;
});

const isOpen = edge => {
  const edges = edgeTargets[edge.source];
  if (edge.on !== undefined) return edge.on;
  edge.on = edges
    ? edges.filter(edge => nodeMap[edge.target] && isOpen(edge)).length !== 0
    : edge.source === undefined || nodeMap[edge.source];
  return edge.on;
};

edges.forEach(edge => {
  if (edge.target) return;
  isOpen(edge);
});

console.log(edges);
