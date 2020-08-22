import { init } from "./zrender";
import { createUtils } from "./createUtils";
import { createStore } from "./createStore";
import { createConfig } from "./createConfig";
import { createRender } from "./createRender";
import { createDragPlanHandler } from "./createDragPlanHandler";
import { createDragLineHandler } from "./createDragLineHandler";

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

const root = document.getElementById("root");

const zr = init(root, {
  // renderer: "svg"
});
zr.flush();

const config = createConfig({ width: root.offsetWidth, height: root.offsetHeight });
const utils = createUtils({ config });
const store = createStore({ dataList, config });

const { render } = createRender({ dataList, zr, config, utils, store });

render();
createDragPlanHandler({ dataList, config, utils, store });
createDragLineHandler({ dataList, config, utils, store });
