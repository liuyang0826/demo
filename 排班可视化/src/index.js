import { init } from "./init";
import { createConfig } from "./createConfig";
import { createUtils } from "./createUtils";
import { createRender } from "./createRender";
import { createStore } from "./createStore";
import { createEventHandler } from "./createEventHandler";
import { createHistory } from "./createHistory";

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
  return Array.from({ length: 8 }).map((_, index) => {
    let start = new Date().getTime() - ~~(Math.random() * 75 * 60 * 1000);
    return {
      name: (index + 1) + "#高炉",
      planList: Array.from({ length: 32 }).map((_, i) => {
        let startTemp = start;
        let end = startTemp + ~~(6 * 60 * 1000 * (Math.random() + 0.5));
        start = end + ~~(2 * 60 * 1000 * (Math.random() + 0.25));
        let concatId = getConcatId();
        return {
          id: id++,
          name: "铁次A" + (i + 1),
          startTime: startTemp,
          endTime: end,
          concatId: concatId < 8 * 32 ? concatId : null
        };
      })
    };
  });
})());

const root = document.getElementById("root");
const config = createConfig({ width: root.offsetWidth, height: root.offsetHeight });

const { ctx, offCanvas, offCtx, staticCtx } = init(root, config);

const utils = createUtils({ config });
const store = createStore({ config, utils });

store.setDataList(dataList);

const render = createRender({ ctx, offCtx, offCanvas, staticCtx, config, utils, store });

render.render({ forceUpdate: true, init: true });

const history = createHistory({ render, store, utils });

createEventHandler({ root, config, render, ctx, dataList, utils, store, history });
