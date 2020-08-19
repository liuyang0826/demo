export function createHistory (
{
  render: { render },
  store: { setRectAtId, setPlanAtId, getStartTime, ms2px, getDataList },
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
    }
  }

  function rollbackMove (moveDetail) {
    const dataList = getDataList();
    moveDetail.forEach(
    ({
       from: { xIndex: fromXIndex, yIndex: fromYIndex, snapshot },
       to: { xIndex: toXIndex, yIndex: toYIndex }
     }) => {
      dataList[fromXIndex].planList.splice(fromYIndex, 0, snapshot);
      dataList[toXIndex].planList.splice(toYIndex, 1);
      setRectAtId(snapshot.id, makeRectByPlan(snapshot, fromXIndex, getStartTime(), ms2px()));
      setPlanAtId(snapshot.id, snapshot);
    });
    render({ forceUpdate: true });
  }
  return {
    pushHistory,
    rollback
  }
}
