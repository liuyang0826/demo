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

  const id2plan = makeMap(dataList, (map, item) => {
    item.head = item.planList[0];
    item.planList.forEach((plan, index) => {
      if (index !== 0) {
        plan.prev = item.planList[index - 1];
      }
      if (index !== item.planList.length - 1) {
        plan.next = item.planList[index + 1];
      }
      map[plan.id] = plan;
    });
    item.planList = null;
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
