import { makeMap } from "./utils";

export function createStore ({ dataList, config: { width, padding, dateRangeMS } }) {

  let _scale = 1;

  function setScale (scale) {
    _scale = scale;
  }

  function getScale () {
    return _scale;
  }

  let _startTime = new Date().getTime() - 1000 * 60 * 60 * 1.2;

  function getStartTime () {
    return _startTime;
  }

  function setStartTime (startTime) {
    _startTime = startTime;
  }

  let id2plan = makeMap(dataList, (map, item) => {
    item.planList.forEach((plan) => {
      map[plan.id] = plan;
    });
  });

  function getPlanById (id) {
    return id2plan[id];
  }

  function setPlanAtId (id, plan) {
    id2plan[id] = plan;
  }

  function ms2px () {
    return (width - padding.left - padding.right) / dateRangeMS * _scale;
  }

  let translateX = 0;

  function setTranslateX (_translateX) {
    translateX = _translateX;
  }

  function getTranslateX (_translateX) {
    return translateX;
  }

  return {
    getPlanById,
    setPlanAtId,
    setScale,
    getScale,
    setStartTime,
    getStartTime,
    ms2px,
    setTranslateX,
    getTranslateX
  };
}
