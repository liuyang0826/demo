/**
 * @Describe: Describe
 * @Author: liuyang
 * @Date: 2020-04-22 15:34
 */

const axios = require("axios");
const fs = require("fs");
let css = `[
  {
    "id": "category0", "text": "输入", "icon": "ui/images/folder.svg?scale=32", "cls": "nav-node", "children": [
      {
        "id": "step1",
        "text": "Excel输入",
        "pluginId": "ExcelInput",
        "icon": "ui/images/XLI.svg?scale=32",
        "dragIcon": "ui/images/XLI.svg?scale=32",
        "cls": "nav",
        "qtip": "从一个微软的Excel文件里读取数据. 兼容Excel 95, 97 and 2000.",
        "leaf": true
      },
      {
        "id": "step2",
        "text": "文本文件输入",
        "pluginId": "TextFileInput",
        "icon": "ui/images/TFI.svg?scale=32",
        "dragIcon": "ui/images/TFI.svg?scale=32",
        "cls": "nav",
        "qtip": "从一个文本文件（几种格式）里读取数据{0}这些数据可以被传递到下一个步骤里...",
        "leaf": true
      },
      {
        "id": "step3",
        "text": "生成记录",
        "pluginId": "RowGenerator",
        "icon": "ui/images/GEN.svg?scale=32",
        "dragIcon": "ui/images/GEN.svg?scale=32",
        "cls": "nav",
        "qtip": "产生一些空记录或相等的行.",
        "leaf": true
      },
      {
        "id": "step4",
        "text": "生成随机数",
        "pluginId": "RandomValue",
        "icon": "ui/images/RVA.svg?scale=32",
        "dragIcon": "ui/images/RVA.svg?scale=32",
        "cls": "nav",
        "qtip": "Generate random value",
        "leaf": true
      },
      {
        "id": "step5",
        "text": "自定义常量数据",
        "pluginId": "DataGrid",
        "icon": "ui/images/GNR.svg?scale=32",
        "dragIcon": "ui/images/GNR.svg?scale=32",
        "cls": "nav",
        "qtip": "Enter rows of static data in a grid, usually for testing, reference or demo purpose",
        "leaf": true
      },
      {
        "id": "step6",
        "text": "获取系统信息",
        "pluginId": "SystemInfo",
        "icon": "ui/images/SYS.svg?scale=32",
        "dragIcon": "ui/images/SYS.svg?scale=32",
        "cls": "nav",
        "qtip": "获取系统信息，例如时间、日期.",
        "leaf": true
      },
      {
        "id": "step7",
        "text": "表输入",
        "pluginId": "TableInput",
        "icon": "ui/images/TIP.svg?scale=32",
        "dragIcon": "ui/images/TIP.svg?scale=32",
        "cls": "nav",
        "qtip": "从数据库表里读取信息.",
        "leaf": true
      }
    ]
  },
  {
    "id": "category8", "text": "输出", "icon": "ui/images/folder.svg?scale=32", "cls": "nav-node", "children": [
      {
        "id": "step9",
        "text": "Excel输出",
        "pluginId": "ExcelOutput",
        "icon": "ui/images/XLO.svg?scale=32",
        "dragIcon": "ui/images/XLO.svg?scale=32",
        "cls": "nav",
        "qtip": "Stores records into an Excel (XLS) document with formatting information.",
        "leaf": true
      },
      {
        "id": "step10",
        "text": "SQL 文件输出",
        "pluginId": "SQLFileOutput",
        "icon": "ui/images/SFO.svg?scale=32",
        "dragIcon": "ui/images/SFO.svg?scale=32",
        "cls": "nav",
        "qtip": "Output SQL INSERT statements to file",
        "leaf": true
      },
      {
        "id": "step11",
        "text": "删除",
        "pluginId": "Delete",
        "icon": "ui/images/Delete.svg?scale=32",
        "dragIcon": "ui/images/Delete.svg?scale=32",
        "cls": "nav",
        "qtip": "基于关键字删除记录",
        "leaf": true
      },
      {
        "id": "step12",
        "text": "插入 / 更新",
        "pluginId": "InsertUpdate",
        "icon": "ui/images/INU.svg?scale=32",
        "dragIcon": "ui/images/INU.svg?scale=32",
        "cls": "nav",
        "qtip": "基于关键字更新或插入记录到数据库.",
        "leaf": true
      },
      {
        "id": "step13",
        "text": "数据同步",
        "pluginId": "SynchronizeAfterMerge",
        "icon": "ui/images/SAM.svg?scale=32",
        "dragIcon": "ui/images/SAM.svg?scale=32",
        "cls": "nav",
        "qtip": "This step perform insert/update/delete in one go based on the value of a field. ",
        "leaf": true
      },
      {
        "id": "step14",
        "text": "文本文件输出",
        "pluginId": "TextFileOutput",
        "icon": "ui/images/TFO.svg?scale=32",
        "dragIcon": "ui/images/TFO.svg?scale=32",
        "cls": "nav",
        "qtip": "写记录到一个文本文件.",
        "leaf": true
      },
      {
        "id": "step15",
        "text": "更新",
        "pluginId": "Update",
        "icon": "ui/images/UPD.svg?scale=32",
        "dragIcon": "ui/images/UPD.svg?scale=32",
        "cls": "nav",
        "qtip": "基于关键字更新记录到数据库",
        "leaf": true
      },
      {
        "id": "step16",
        "text": "表输出",
        "pluginId": "TableOutput",
        "icon": "ui/images/TOP.svg?scale=32",
        "dragIcon": "ui/images/TOP.svg?scale=32",
        "cls": "nav",
        "qtip": "写信息到一个数据库表",
        "leaf": true
      }
    ]
  },
  {
    "id": "category17", "text": "转换", "icon": "ui/images/folder.svg?scale=32", "cls": "nav-node", "children": [
      {
        "id": "step18",
        "text": "值映射",
        "pluginId": "ValueMapper",
        "icon": "ui/images/VMAP.svg?scale=32",
        "dragIcon": "ui/images/VMAP.svg?scale=32",
        "cls": "nav",
        "qtip": "Maps values of a certain field from one value to another",
        "leaf": true
      },
      {
        "id": "step19",
        "text": "列转行",
        "pluginId": "Denormaliser",
        "icon": "ui/images/UNP.svg?scale=32",
        "dragIcon": "ui/images/UNP.svg?scale=32",
        "cls": "nav",
        "qtip": "Denormalises rows by looking up key-value pairs and by assigning them to new fields in the输出 rows.{0}This method aggregates and needs the输入 rows to be sorted on the grouping fields",
        "leaf": true
      },
      {
        "id": "step20",
        "text": "剪切字符串",
        "pluginId": "StringCut",
        "icon": "ui/images/SRC.svg?scale=32",
        "dragIcon": "ui/images/SRC.svg?scale=32",
        "cls": "nav",
        "qtip": "Strings cut (substring).",
        "leaf": true
      },
      {
        "id": "step21",
        "text": "去除重复记录",
        "pluginId": "Unique",
        "icon": "ui/images/UNQ.svg?scale=32",
        "dragIcon": "ui/images/UNQ.svg?scale=32",
        "cls": "nav",
        "qtip": "去除重复的记录行，保持记录唯一{0}这个仅仅基于一个已经排好序的输入.{1}如果输入没有排序, 仅仅两个连续的记录行被正确处理.",
        "leaf": true
      },
      {
        "id": "step22",
        "text": "增加常量",
        "pluginId": "Constant",
        "icon": "ui/images/CST.svg?scale=32",
        "dragIcon": "ui/images/CST.svg?scale=32",
        "cls": "nav",
        "qtip": "给记录增加一到多个常量",
        "leaf": true
      },
      {
        "id": "step23",
        "text": "增加序列",
        "pluginId": "Sequence",
        "icon": "ui/images/SEQ.svg?scale=32",
        "dragIcon": "ui/images/SEQ.svg?scale=32",
        "cls": "nav",
        "qtip": "从序列获取下一个值",
        "leaf": true
      },
      {
        "id": "step24",
        "text": "增加校验列",
        "pluginId": "CheckSum",
        "icon": "ui/images/CSM.svg?scale=32",
        "dragIcon": "ui/images/CSM.svg?scale=32",
        "cls": "nav",
        "qtip": "Add a checksum column for each input row",
        "leaf": true
      },
      {
        "id": "step25",
        "text": "字段选择",
        "pluginId": "SelectValues",
        "icon": "ui/images/SEL.svg?scale=32",
        "dragIcon": "ui/images/SEL.svg?scale=32",
        "cls": "nav",
        "qtip": "选择或移除记录里的字。{0}此外，可以设置字段的元数据: 类型, 长度和精度.",
        "leaf": true
      },
      {
        "id": "step26",
        "text": "字符串替换",
        "pluginId": "ReplaceString",
        "icon": "ui/images/RST.svg?scale=32",
        "dragIcon": "ui/images/RST.svg?scale=32",
        "cls": "nav",
        "qtip": "Replace all occurences a word in a string with another word.",
        "leaf": true
      },
      {
        "id": "step27",
        "text": "排序记录",
        "pluginId": "SortRows",
        "icon": "ui/images/SRT.svg?scale=32",
        "dragIcon": "ui/images/SRT.svg?scale=32",
        "cls": "nav",
        "qtip": "基于字段值把记录排序(升序或降序)",
        "leaf": true
      },
      {
        "id": "step28",
        "text": "行扁平化",
        "pluginId": "Flattener",
        "icon": "ui/images/FLA.svg?scale=32",
        "dragIcon": "ui/images/FLA.svg?scale=32",
        "cls": "nav",
        "qtip": "Flattens consequetive rows based on the order in which they appear in the输入 stream",
        "leaf": true
      },
      {
        "id": "step29",
        "text": "行转列",
        "pluginId": "Normaliser",
        "icon": "ui/images/NRM.svg?scale=32",
        "dragIcon": "ui/images/NRM.svg?scale=32",
        "cls": "nav",
        "qtip": "De-normalised information can be normalised using this step type.",
        "leaf": true
      }
    ]
  },
  {
    "id": "category30",
    "text": "应用",
    "icon": "ui/images/folder.svg?scale=32",
    "cls": "nav-node",
    "children": [
      {
        "id": "step31",
        "text": "写日志",
        "pluginId": "WriteToLog",
        "icon": "ui/images/WTL.svg?scale=32",
        "dragIcon": "ui/images/WTL.svg?scale=32",
        "cls": "nav",
        "qtip": "Write data to log",
        "leaf": true
      }
    ]
  },
  {
    "id": "category32", "text": "流程", "icon": "ui/images/folder.svg?scale=32", "cls": "nav-node", "children": [
      {
        "id": "step33",
        "text": "Switch / Case",
        "pluginId": "SwitchCase",
        "icon": "ui/images/SWC.svg?scale=32",
        "dragIcon": "ui/images/SWC.svg?scale=32",
        "cls": "nav",
        "qtip": "Switch a row to a certain target step based on the case value in a field.",
        "leaf": true
      },
      {
        "id": "step34",
        "text": "根据Java代码过滤记录",
        "pluginId": "JavaFilter",
        "icon": "ui/images/JLT.svg?scale=32",
        "dragIcon": "ui/images/JLT.svg?scale=32",
        "cls": "nav",
        "qtip": "Filter rows using java code",
        "leaf": true
      },
      {
        "id": "step35",
        "text": "空操作 (什么也不做)",
        "pluginId": "Dummy",
        "icon": "ui/images/DUM.svg?scale=32",
        "dragIcon": "ui/images/DUM.svg?scale=32",
        "cls": "nav",
        "qtip": "这个步骤类型什么都不作.{0} 当你想测试或拆分数据流的时候有用.",
        "leaf": true
      },
      {
        "id": "step36",
        "text": "过滤记录",
        "pluginId": "FilterRows",
        "icon": "ui/images/FLT.svg?scale=32",
        "dragIcon": "ui/images/FLT.svg?scale=32",
        "cls": "nav",
        "qtip": "使用简单的相等来过滤记录",
        "leaf": true
      },
      {
        "id": "step37",
        "text": "追加流",
        "pluginId": "Append",
        "icon": "ui/images/APP.svg?scale=32",
        "dragIcon": "ui/images/APP.svg?scale=32",
        "cls": "nav",
        "qtip": "Append 2 streams in an ordered way",
        "leaf": true
      }
    ]
  },
  {
    "id": "category38",
    "text": "脚本",
    "icon": "ui/images/folder.svg?scale=32",
    "cls": "nav-node",
    "children": [
      {
        "id": "step39",
        "text": "JavaScript代码",
        "pluginId": "ScriptValueMod",
        "icon": "ui/images/SCR_mod.svg?scale=32",
        "dragIcon": "ui/images/SCR_mod.svg?scale=32",
        "cls": "nav",
        "qtip": "This is a modified plugin for the Scripting Values with improved interface and performance.\\nWritten & donated to open source by Martin Lange, Proconis : http://www.proconis.de",
        "leaf": true
      },
      {
        "id": "step40",
        "text": "执行SQL脚本",
        "pluginId": "ExecSQL",
        "icon": "ui/images/SQL.svg?scale=32",
        "dragIcon": "ui/images/SQL.svg?scale=32",
        "cls": "nav",
        "qtip": "执行一个SQL脚本, 另外，可以使用输入的记录作为参数",
        "leaf": true
      }
    ]
  },
  {
    "id": "category41", "text": "连接", "icon": "ui/images/folder.svg?scale=32", "cls": "nav-node", "children": [
      {
        "id": "step42",
        "text": "Multiway Merge Join",
        "pluginId": "MultiwayMergeJoin",
        "icon": "ui/images/MJOINS.svg?scale=32",
        "dragIcon": "ui/images/MJOINS.svg?scale=32",
        "cls": "nav",
        "qtip": "Multiway Merge Join",
        "leaf": true
      },
      {
        "id": "step43",
        "text": "合并记录",
        "pluginId": "MergeRows",
        "icon": "ui/images/MRG.svg?scale=32",
        "dragIcon": "ui/images/MRG.svg?scale=32",
        "cls": "nav",
        "qtip": "合并两个数据流, 并根据某个关键字排序.  这两个数据流被比较，以标识相等的、变更的、删除的和新建的记录.",
        "leaf": true
      },
      {
        "id": "step44",
        "text": "排序合并",
        "pluginId": "SortedMerge",
        "icon": "ui/images/SMG.svg?scale=32",
        "dragIcon": "ui/images/SMG.svg?scale=32",
        "cls": "nav",
        "qtip": "Sorted Merge",
        "leaf": true
      },
      {
        "id": "step45",
        "text": "记录关联 (笛卡尔输出)",
        "pluginId": "JoinRows",
        "icon": "ui/images/JRW.svg?scale=32",
        "dragIcon": "ui/images/JRW.svg?scale=32",
        "cls": "nav",
        "qtip": "这个步骤的输出是输入流的笛卡尔的结果.{0} 输出结果的记录数是输入流记录之间的乘积.",
        "leaf": true
      },
      {
        "id": "step46",
        "text": "记录集连接",
        "pluginId": "MergeJoin",
        "icon": "ui/images/MJOIN.svg?scale=32",
        "dragIcon": "ui/images/MJOIN.svg?scale=32",
        "cls": "nav",
        "qtip": "Joins two streams on a given key and outputs a joined set. The input streams must be sorted on the join key",
        "leaf": true
      }
    ]
  },
  {
    "id": "category47",
    "text": "统计",
    "icon": "ui/images/folder.svg?scale=32",
    "cls": "nav-node",
    "children": [
      {
        "id": "step48",
        "text": "样本行",
        "pluginId": "SampleRows",
        "icon": "ui/images/SR.svg?scale=32",
        "dragIcon": "ui/images/SR.svg?scale=32",
        "cls": "nav",
        "qtip": "Filter rows based on the line number.",
        "leaf": true
      }
    ]
  },
  {
    "id": "category49", "text": "作业", "icon": "ui/images/folder.svg?scale=32", "cls": "nav-node", "children": [
      {
        "id": "step50",
        "text": "从结果获取文件",
        "pluginId": "FilesFromResult",
        "icon": "ui/images/FFR.svg?scale=32",
        "dragIcon": "ui/images/FFR.svg?scale=32",
        "cls": "nav",
        "qtip": "This step allows you to read filenames used or generated in a previous entry in a job.",
        "leaf": true
      },
      {
        "id": "step51",
        "text": "从结果获取记录",
        "pluginId": "RowsFromResult",
        "icon": "ui/images/FCH.svg?scale=32",
        "dragIcon": "ui/images/FCH.svg?scale=32",
        "cls": "nav",
        "qtip": "这个允许你从同一个任务的前一个条目里读取记录.",
        "leaf": true
      },
      {
        "id": "step52",
        "text": "复制记录到结果",
        "pluginId": "RowsToResult",
        "icon": "ui/images/TCH.svg?scale=32",
        "dragIcon": "ui/images/TCH.svg?scale=32",
        "cls": "nav",
        "qtip": "使用这个步骤把记录写到正在执行的任务.{0}信息将会被传递给同一个任务里的下一个条目.",
        "leaf": true
      },
      {
        "id": "step53",
        "text": "获取变量",
        "pluginId": "GetVariable",
        "icon": "ui/images/GVA.svg?scale=32",
        "dragIcon": "ui/images/GVA.svg?scale=32",
        "cls": "nav",
        "qtip": "Determine the values of certain (environment or Kettle) variables and put them in field values.",
        "leaf": true
      },
      {
        "id": "step54",
        "text": "设置变量",
        "pluginId": "SetVariable",
        "icon": "ui/images/SVA.svg?scale=32",
        "dragIcon": "ui/images/SVA.svg?scale=32",
        "cls": "nav",
        "qtip": "Set environment variables based on a single input row.",
        "leaf": true
      }
    ]
  },
  {
    "id": "category55",
    "text": "big data",
    "icon": "ui/images/folder.svg?scale=32",
    "cls": "nav-node",
    "children": [
      {
        "id": "step56",
        "text": "Hadoop File Input",
        "pluginId": "HadoopFileInput",
        "icon": "ui/images/HDI.svg?scale=32",
        "dragIcon": "ui/images/HDI.svg?scale=32",
        "cls": "nav",
        "qtip": "HadoopFileInputPlugin.Description",
        "leaf": true
      },
      {
        "id": "step57",
        "text": "<font color="
        red">Hadoop File Output</font>",
        "pluginId": "HadoopFileOutput",
        "icon": "ui/images/HDO.svg?scale=32",
        "dragIcon": "ui/images/HDO.svg?scale=32",
        "cls": "nav",
        "qtip": "i18n:org.pentaho.di.trans.step:BaseStep.TypeLongDesc.HadoopFileOutput",
        "leaf": true
      }
    ]
  }
];
`
let regx = /ui.+32/g;
css.match(regx).forEach((url) => {
  axios.get("http://127.0.0.1:8089/" + url, {
    responseType: "arraybuffer"
  })
  .then((res) => {
    let path = url.split("/");
    fs.writeFileSync("./tree-icons/" + path[path.length - 1].split(".")[0] + ".png", res.data);
  });
});
