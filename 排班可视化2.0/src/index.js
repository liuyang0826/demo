import { init } from "./zrender";
import { initData } from "./init/data";
import { initBackgroundContainer, initContentContainer } from "./init/container";
import { backgroundRender } from "./render/background";
import { contentRender } from "./render/content";
import { createDragPlanHandler } from "./event/dragPlan";
import { createDragLineHandler } from "./event/dragLine";

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
    let start = new Date().getTime() - ~~(Math.random() * 75 * 60 * 1000);
    return {
      name: (index + 1) + "#高炉",
      planList: Array.from({ length: 2 ** num }).map((_, i) => {
        let startTemp = start;
        let end = startTemp + ~~(6 * 60 * 1000 * (Math.random() + 0.5));
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
              duration: space
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
contentRender(contentZR, dataList, id2plan);

createDragPlanHandler(dataList);
createDragLineHandler(dataList, id2plan);
