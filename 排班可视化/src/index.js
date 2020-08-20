import { init } from "./init";
import { createConfig } from "./createConfig";
import { createUtils } from "./createUtils";
import { createRender } from "./createRender";
import { createStore } from "./createStore";
import { createEventHandler } from "./createEventHandler";
import { createHistory } from "./createHistory";
import { loadIcon } from "./utils";

const dataList = Object.freeze((function () {
  let idMap = {};

  function getConcatId () {
    let id = ~~(Math.random() * 64 * 64);
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
      planList: Array.from({ length: 32 }).map((_, i) => {
        let startTemp = start;
        let end = startTemp + ~~(8 * 60 * 1000 * (Math.random() + 0.5));
        start = end + ~~(2 * 60 * 1000 * (Math.random() + 0.25));
        let concatId = getConcatId();
        const space = (end - startTemp) / 3;
        return {
          id: id++,
          name: "铁次A" + (i + 1),
          startTime: startTemp,
          endTime: end,
          concatId: concatId < 8 * 32 ? concatId : null,
          icon: icons[~~(Math.random() * 6)],
          subPlanList: Array.from({length: 3}).map((_, i) => {
            return {
              duration: space
            }
          })
        };
      })
    };
  });
})());

const root = document.getElementById("root");

async function main () {
  const config = createConfig({ width: root.offsetWidth, height: root.offsetHeight });

  const { ctx, offCanvas, offCtx, staticCtx } = init(root, config);

  const utils = createUtils({ config });
  const store = createStore({ config, utils });

  store.setDataList(dataList);

  const icons = {
    car: await loadIcon("images/car.png"),
    person: await loadIcon("images/person.png"),
    iron: await loadIcon("images/iron.png")
  };

  const render = createRender({ ctx, offCtx, offCanvas, staticCtx, config, utils, store, icons });

  render.render({ forceUpdate: true, init: true });

  const history = createHistory({ render, store, utils });

  createEventHandler({ root, config, render, ctx, dataList, utils, store, history });
}

main();
