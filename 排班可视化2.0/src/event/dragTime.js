export function createDragTimeHandler (group, modal) {
  // 鼠标偏移量
  const dragOffset = { x: 0, y: 0 };
  group
  .on("dragstart", (e) => {
    dragOffset.x = e.offsetX;
    dragOffset.y = e.offsetY;
  })
  .on("drag", (e) => {
    // planGroup.position = [500, 0];
    // planGroup.transform = [1, 0, 0, 1, 500, 0];
    // planGroup.invTransform = [1, -0, -0, 1, -500, -0];
    // planGroup.decomposeTransform();
    modal.setShape({
      width: modal.shape.width + dragOffset.x - e.offsetX
    });
    dragOffset.x = e.offsetX;
  });
}
