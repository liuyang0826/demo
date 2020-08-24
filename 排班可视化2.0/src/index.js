import { Group, init } from "./zrender";
import { initData } from "./init/data";
import { initBackgroundContainer, initContentContainer } from "./init/container";
import { backgroundRender } from "./render/background";
import { createDragPlanHandler } from "./event/dragPlan";
import { createDragLineHandler } from "./event/dragLine";
import { createDragTimeHandler } from "./event/dragTime";
import { config } from "./config";
import { ms2px } from "./utils";
import { plansRender } from "./render/plans";
import { concatLinesRender } from "./render/concatLines";
import { splitLineRender } from "./render/splitLine";
import { subPlansRender } from "./render/subPlans";

const dataList = Object.freeze((function () {
  let idMap = {};
  const num = 5;

  function getConcatId () {
    let id = ~~(Math.random() * 2 ** (num * 2 + 3));
    if (idMap[id]) {
      return getConcatId();
    } else {
      idMap[id] = true;
      return id;
    }
  }

  let id = 1;
  const icons = ["car", "person", "iron"];
  return Array.from({ length: 8 }).map((_, index) => {
    let start = new Date().getTime() - ~~(Math.random() * 60 * 60 * 1000);
    return {
      name: (index + 1) + "#高炉",
      planList: Array.from({ length: 2 ** num }).map((_, i) => {
        let startTemp = start;
        let end = startTemp + ~~(24 * 60 * 1000 * (Math.random() + 0.5));
        start = end + ~~(2 * 60 * 1000 * (Math.random() + 0.25));
        let concatId = getConcatId();
        const space = (end - startTemp) / 3;
        return {
          id: id++,
          name: "铁次A" + (i + 1),
          startTime: startTemp,
          endTime: end,
          concatId: concatId < 8 * 2 ** num ? concatId : null,
          icon: icons[~~(Math.random() * 6)],
          subPlanList: Array.from({ length: 3 }).map((_, i) => {
            return {
              startTime: startTemp + i * space,
              endTime: startTemp + i * space + space,
              name: Math.random().toString(36).substring(2, 6),
            };
          })
        };
      })
    };
  });
})());

const id2plan = initData(dataList);

const root = document.getElementById("root");

const backgroundContainer = initBackgroundContainer(root);
const contentContainer = initContentContainer(root);

const backgroundZR = init(backgroundContainer);
backgroundRender(backgroundZR, dataList);

const contentZR = init(contentContainer);
const planGroup = new Group({
  draggable: "horizontal"
});
contentZR.add(planGroup);

const planRectGroup = new Group(); // 计划块分组
planGroup.add(planRectGroup);
const updatePlans = plansRender(dataList, planRectGroup);

const updateConcatLines = concatLinesRender(dataList, planGroup, id2plan);

const updateSubPlansRender = subPlansRender(dataList, planGroup);

const { modal, update: updateSplitLineRender  } = splitLineRender(planGroup);

createDragPlanHandler(dataList);
createDragLineHandler(dataList, id2plan);
createDragTimeHandler(planGroup, modal);

root.addEventListener("mousewheel", function (e) {
  const _ms2px = ms2px();
  config.scale += config.scaleSpeed * (e.wheelDelta > 0 ? 1 : -1);
  config.scale <= 0 && (config.scale = 0.01);
  config.startTime += (e.offsetX - planGroup.position[0]) * (1 / _ms2px - 1 / ms2px());
  updatePlans();
  updateConcatLines();
  updateSubPlansRender();
  updateSplitLineRender();
});
