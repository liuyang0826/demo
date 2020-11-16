import {init, Rect, Polyline, Circle} from 'zrender'

const zr = init(document.querySelector('#root'))

const data = [
  {
    id: 1,
    type: 'rect',
    shape: {
      x: 100.5,
      y: 100.5,
      width: 200,
      height: 100
    },
    lineRelations: [
      {
        id: 3,
        isStart: true,
        isVertical: true,
        isBottom: true
      }
    ]
  },
  {
    id: 2,
    type: 'rect',
    shape: {
      x: 400.5,
      y: 400.5,
      width: 200,
      height: 100
    },
    lineRelations: [
      {
        id: 3,
        isStart: false,
        isVertical: true,
        isBottom: false
      }
    ]
  },
  {
    id: 3,
    type: 'line',
    shape: {
      points: [
        [200.5, 200.5],
        [200.5, 300.5],
        [500.5, 300.5],
        [500.5, 400.5],
      ]
    }
  },
]

// id 索引
const idMap = {}

let curRect
let curVertexes = []
// 是否点击画布空区域 用于清除当前高亮的元素
let isRootTarget = true

zr.on('mousedown', () => {
  if (isRootTarget) {
    setCurElement()
  } else {
    isRootTarget = true
  }
})

function setCurElement (element) {
  curVertexes.forEach((circle) => {
    zr.remove(circle)
    circle.off('dragstart', circle.dragstart)
    circle.off('drag', circle.drag)
  })
  curVertexes = []
  curRect = element
}

data.forEach((item) => {
  switch (item.type) {
    case 'rect':
      renderRect(item)
      break
    case 'line':
      renderLine(item)
      break
  }
})

function renderRect (data) {
  const rect = new Rect({
    shape: data.shape,
    style: {
      fill: '#fff',
      stroke: 1
    },
    draggable: true,
    data
  })
  zr.add(rect)
  idMap[data.id] = rect

  let prevEvent
  rect.on('dragstart', (e) => {
    isRootTarget = false
    prevEvent = e
    if (curRect === rect) return
    setCurElement(rect)
    renderRectVertexes(rect)
  })
  rect.on('drag', (e) => {
    const offset = {
      x: e.offsetX - prevEvent.offsetX,
      y: e.offsetY - prevEvent.offsetY,
    }
    prevEvent = e
    data.lineRelations.forEach((lineRelation) => {
      lineFollowRect(lineRelation, offset)
    })
    curVertexes.forEach((vertex) => {
      vertexFollowRectDrag(vertex, offset)
    })
  })

  rect.on('dragend', () => {
    const shape = rect.shape
    shape.x += rect.position[0]
    shape.y += rect.position[1]
    rect.setShape(shape)
    resetTransform(rect)
  })
}

// 线跟随拖动
function lineFollowRect (lineRelation, offset) {
  const line = idMap[lineRelation.id]
  const points = line.shape.points
  if (lineRelation.isVertical) {
    if (lineRelation.isStart) {
      points[0][0] += offset.x
      points[0][1] += offset.y
      points[1][0] = points[0][0]
    } else {
      points[3][0] += offset.x
      points[3][1] += offset.y
      points[2][0] = points[3][0]
    }
    // 移动中间值
    points[1][1] = ~~((points[0][1] + points[3][1]) / 2) + 0.5
    points[2][1] = points[1][1]
    line.setShape({
      points
    })
  }
}

// 顶点跟随拖动
function vertexFollowRectDrag (circle, offset) {
  const shape = circle.shape
  shape.cx += offset.x
  shape.cy += offset.y
  circle.setShape(shape)
}

function renderLine (data) {
  const polyline = new Polyline({
    shape: data.shape,
    data
  })
  zr.add(polyline)
  idMap[data.id] = polyline
}

// 绘制顶点
function renderRectVertexes (rect) {
  const shape = rect.shape
  const halfW = shape.width / 2
  const halfH = shape.height / 2;
  [
    [shape.x, shape.y],
    [shape.x + halfW, shape.y],
    [shape.x + shape.width, shape.y],
    [shape.x + shape.width, shape.y + halfH],
    [shape.x + shape.width, shape.y + shape.height],
    [shape.x + halfW, shape.y + shape.height],
    [shape.x, shape.y + shape.height],
    [shape.x, shape.y + halfH]
  ].forEach((point, index) => {
    const circle = new Circle({
      shape: {
        cx: point[0],
        cy: point[1],
        r: 4
      },
      style: {
        fill: '#fff',
        stroke: 1
      },
      draggable: true
    })
    zr.add(circle)
    curVertexes.push(circle)

    // 顶点拖拽
    let prevEvent

    circle.dragstart = (e) => {
      isRootTarget = false
      prevEvent = e
    }
    circle.drag = (e) => {
      const offset = {
        x: e.offsetX - prevEvent.offsetX,
        y: e.offsetY - prevEvent.offsetY,
      }
      prevEvent = e;
      [resizeLT, resizeT, resizeRT, resizeR, resizeRB, resizeB, resizeLB, resizeL][index](offset)
      vertexFollowRectResize(index)
      resetTransform(circle)
    }
    circle.on('dragstart', circle.dragstart)
    circle.on('drag', circle.drag)
  })
}

function vertexFollowRectResize (excludeIndex) {
  const shape = curRect.shape
  const halfW = shape.width / 2
  const halfH = shape.height / 2;
  [
    [shape.x, shape.y],
    [shape.x + halfW, shape.y],
    [shape.x + shape.width, shape.y],
    [shape.x + shape.width, shape.y + halfH],
    [shape.x + shape.width, shape.y + shape.height],
    [shape.x + halfW, shape.y + shape.height],
    [shape.x, shape.y + shape.height],
    [shape.x, shape.y + halfH]
  ].forEach((point, index) => {
    // if (excludeIndex === index) return;
    curVertexes[index].setShape({
      cx: point[0],
      cy: point[1]
    })
  })
}

// 左上
function resizeLT (offset) {
  const shape = curRect.shape
  shape.x += offset.x
  shape.y += offset.y
  shape.width -= offset.x * 2
  shape.height -= offset.y
  curRect.setShape(shape)

  curRect.data.lineRelations.forEach((lineRelation) => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? 0 : offset.y
      })
    }
  })
}

// 上
function resizeT (offset) {
  const shape = curRect.shape
  shape.y += offset.y
  shape.height -= offset.y * 2
  curRect.setShape(shape)
  curRect.data.lineRelations.forEach((lineRelation) => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? -offset.y : offset.y
      })
    }
  })
}

// 右上
function resizeRT (offset) {
  const shape = curRect.shape
  shape.x -= offset.x
  shape.width += offset.x * 2
  shape.y += offset.y
  shape.height -= offset.y
  curRect.setShape(shape)

  curRect.data.lineRelations.forEach((lineRelation) => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? 0 : offset.y
      })
    }
  })
}

// 右
function resizeR (offset) {
  const shape = curRect.shape
  shape.x -= offset.x
  shape.width += offset.x * 2
  curRect.setShape(shape)
}

// 右下
function resizeRB (offset) {
  const shape = curRect.shape
  shape.x -= offset.x
  shape.width += offset.x * 2
  shape.height += offset.y
  curRect.setShape(shape)

  curRect.data.lineRelations.forEach((lineRelation) => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : 0
      })
    }
  })
}

// 下
function resizeB (offset) {
  const shape = curRect.shape
  shape.y -= offset.y
  shape.height += offset.y * 2
  curRect.setShape(shape)
  curRect.data.lineRelations.forEach((lineRelation) => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : -offset.y
      })
    }
  })
}

// 左下
function resizeLB (offset) {
  const shape = curRect.shape
  shape.x += offset.x
  shape.width -= offset.x * 2
  shape.height += offset.y
  curRect.setShape(shape)

  curRect.data.lineRelations.forEach((lineRelation) => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : 0
      })
    }
  })
}

// 左
function resizeL (offset) {
  const shape = curRect.shape
  shape.x += offset.x
  shape.width -= offset.x * 2
  curRect.setShape(shape)
}

// 重置transform
function resetTransform (element, offset = 0) {
  element.transform = [1, 0, 0, 1, offset, 0]
  element.invTransform = [1, -0, -0, 1, -offset, -0]
  element.decomposeTransform()
}
