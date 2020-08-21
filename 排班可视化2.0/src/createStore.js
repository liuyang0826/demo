import { makeMap } from "./utils";

export function createStore ({ config: { width, padding, dateRangeMS } }) {
  let dataList = [];
  let concatList = [];

  function setDataList (_dataList) {
    dataList = _dataList;
    makeId2plan();
    makeConcatList();
  }

  function makeConcatList () {
    concatList = [];
    dataList.forEach((item) => {
      item.planList.forEach((item) => {
        if (getPlanById(item.concatId)) {
          concatList.push(item);
        }
      });
    });
  }

  function updateConcat (delId, add) {
    const index = concatList.findIndex(d => d.id === delId);
    if (index > 0) {
      concatList.splice(index, 1, add);
    }
  }

  function getDataList () {
    return dataList;
  }

  function getConcatList () {
    return concatList;
  }

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

  let id2plan = {};

  function makeId2plan () {
    id2plan = makeMap(dataList, (map, item) => {
      item.planList.forEach((plan) => {
        map[plan.id] = plan;
      });
    });
  }

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
    setDataList,
    getDataList,
    updateConcat,
    getConcatList,
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
