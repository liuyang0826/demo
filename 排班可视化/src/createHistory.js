export function createHistory (
{
  render: { render },
  store: { setRectAtId, setPlanAtId, getStartTime, ms2px, getDataList, getPlanById, updateConcat },
  utils: { makeRectByPlan }
}
) {
  let history = [];

  function pushHistory (record) {
    history.push(record);
  }

  function rollback () {
    if (!history.length) return;
    const curStep = history.pop();
    switch (curStep.type) {
      case "move":
        rollbackMove(curStep.detail);
        break;
      case "moveLine":
        rollbackMoveLine(curStep.detail);
        break;
    }
    render({ forceUpdate: true });
  }

  function rollbackMove (detail) {
    const dataList = getDataList();
    detail.forEach(
    ({
       from: { xIndex: fromXIndex, yIndex: fromYIndex, snapshot },
       to: { xIndex: toXIndex, yIndex: toYIndex }
     }) => {
      dataList[fromXIndex].planList.splice(fromYIndex, 0, snapshot);
      dataList[toXIndex].planList.splice(toYIndex, 1);
      setRectAtId(snapshot.id, makeRectByPlan(snapshot, fromXIndex, getStartTime(), ms2px()));
      setPlanAtId(snapshot.id, snapshot);
    });
  }

  function rollbackMoveLine (detail) {
    switch (detail.type) {
      case "changeStart":
        delete getPlanById(detail.to).concatId;
        const targetPlan = getPlanById(detail.from);
        targetPlan.concatId = detail.concatId;
        updateConcat(detail.to, targetPlan);
        break;
      case "changeEnd":
        getPlanById(detail.concatId).concatId = detail.from;
        break;
    }
  }

  return {
    pushHistory,
    rollback
  }
}
