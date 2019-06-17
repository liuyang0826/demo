(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.draggable = factory());
}(this, function () { 'use strict';

  var matrixRegx = /matrix(3d)?|\(|\)/ig;
  var initMatrix = "matrix(1, 0, 0, 1, 0, 0)";

  var getMatrixArr = function getMatrixArr(matrixStr) {
    return matrixStr.replace(matrixRegx, "").split(",").map(function (d) {
      return +d;
    });
  };

  function draggable(el) {
    var matrix = getMatrixArr(initMatrix);
    var elMatrix = window.getComputedStyle(el).transform;

    if (elMatrix !== "none") {
      matrix = getMatrixArr(elMatrix);
    }

    var getMatrix = function getMatrix(start, target) {
      matrix[4] += target.clientX - start.clientX;
      matrix[5] += target.clientY - start.clientY;
      return "matrix(".concat(matrix.join(","), ")");
    };

    if (matrix.length === 16) {
      getMatrix = function getMatrix(start, target) {
        matrix[12] += target.clientX - start.clientX;
        matrix[13] += target.clientY - start.clientY;
        return "matrix3d(".concat(matrix.join(","), ")");
      };
    }

    function handleMousedown(e) {
      var start = e;

      function handleMousemove(e) {
        e.preventDefault();
        el.style.transform = getMatrix(start, e);
        start = e;
      }

      function handleMouseup() {
        document.removeEventListener("mousemove", handleMousemove);
        document.removeEventListener("mouseup", handleMouseup);
      }

      document.addEventListener("mousemove", handleMousemove);
      document.addEventListener("mouseup", handleMouseup);
    }

    return {
      start: function start() {
        el.addEventListener("mousedown", handleMousedown);
      },
      pause: function pause() {
        el.removeEventListener("mousedown", handleMousedown);
      },
      destroy: function destroy() {
        el.removeEventListener("mousedown", handleMousedown);
      }
    };
  }

  return draggable;

}));
