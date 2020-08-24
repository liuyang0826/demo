import { makeMap } from "../utils";

export function initData (data) {
  const id2plan = makeMap(data, (map, item) => {
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
  return id2plan;
}
