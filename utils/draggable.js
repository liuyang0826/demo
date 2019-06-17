const matrixRegx = /matrix(3d)?|\(|\)/ig;
const initMatrix = "matrix(1, 0, 0, 1, 0, 0)";
const getMatrixArr = matrixStr => matrixStr.replace(matrixRegx, "").split(",").map(d => +d);

function draggable (el) {
  let matrix = getMatrixArr(initMatrix);
  let elMatrix = window.getComputedStyle(el).transform;
  if (elMatrix !== "none") {
    matrix = getMatrixArr(elMatrix);
  }
  let getMatrix = function (start, target) {
    matrix[4] += target.clientX - start.clientX;
    matrix[5] += target.clientY - start.clientY;
    return `matrix(${matrix.join(",")})`;
  };
  if (matrix.length === 16) {
    getMatrix = function (start, target) {
      matrix[12] += target.clientX - start.clientX;
      matrix[13] += target.clientY - start.clientY;
      return `matrix3d(${matrix.join(",")})`;
    };
  }

  function handleMousedown (e) {
    let start = e;

    function handleMousemove (e) {
      e.preventDefault();
      el.style.transform = getMatrix(start, e);
      start = e;
    }

    function handleMouseup () {
      document.removeEventListener("mousemove", handleMousemove);
      document.removeEventListener("mouseup", handleMouseup);
    }

    document.addEventListener("mousemove", handleMousemove);
    document.addEventListener("mouseup", handleMouseup);
  }

  return {
    start: function () {
      el.addEventListener("mousedown", handleMousedown);
    },
    pause: function () {
      el.removeEventListener("mousedown", handleMousedown);
    },
    destroy: function () {
      el.removeEventListener("mousedown", handleMousedown);
    }
  };
}

export default draggable;
