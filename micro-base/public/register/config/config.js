(function (e, t) {
  "object" === typeof exports && "object" === typeof module
  ? module.exports = t()
  : "function" === typeof define && define.amd ? define([], t) : "object" === typeof exports
  ? exports["qTouch_config"] =
  t()
  : e["qTouch_config"] = t();
})(window, (function () {
  // 应用运行的路由
  function pathsInclude(paths) {
    let pathArr = Array.isArray(paths) ? paths : [paths];
    return (location) => pathArr.some((path) => location.pathname.startsWith(qTouch.basePath + path));
  }
  // 应用不运行的路由
  function pathsExclude(paths) {
    let pathArr = Array.isArray(paths) ? paths : [paths];
    return (location) => pathArr.every((path) => !location.pathname.startsWith(qTouch.basePath + path));
  }
  var appPathMap = {
    base: "/base",
    root: "/root",
    eventCenter: "/eventCenter",
    processManage: "/qtouchProcess",
    authority: "/qtouchSysMenu",
    sensorManage: "/qtouchSystemSensorMng",
    deviceManage: "/deviceMng",
    myProcess: "/userMenu",
    inspection: "/inspectionModule",
    organization: "/organization_manage",
    mapConfig: "/mapConfig",
    geographic: "/qtouchGeo",
    personManage: "/personMng",
    vehicleManage: "/carMng",
    buildingManage: "/buildingMng",
    codeRuleManage: "/codeRuleManage",
    regions: "/regions",
    openPlatform: "/openPlatform",
    openPath: "/openPath",
    businessObjectManage: "/business_object",
    locationManage: "/locationManage"
  };
  var manifest = [
    {
      name: "base",
      entry: "/microApp/base.html",
      activeRule: () => true
    },
    {
      name: "root",
      entry: "/microApp/root.html",
      activeRule: pathsInclude(appPathMap.root),
      props: { title: "首页" }
    },
    {
      name: "processManage",
      entry: "/microApp/processManage.html",
      activeRule: pathsInclude(appPathMap.processManage),
      props: { title: "流程管理" }
    },
    {
      name: "myProcess",
      entry: "/microApp/myProcess.html",
      activeRule: pathsInclude(appPathMap.myProcess),
      props: { title: "我的流程" }
    },
    {
      name: "eventCenter",
      entry: "/microApp/eventCenter.html",
      activeRule: pathsInclude(appPathMap.eventCenter),
      props: { title: "事件中心" }
    },
    {
      name: "inspection",
      entry: "/microApp/inspection.html",
      activeRule: pathsInclude(appPathMap.inspection),
      props: { title: "巡查检查" }
    },
    {
      name: "sensorManage",
      entry: "/microApp/sensorManage.html",
      activeRule: pathsInclude(appPathMap.sensorManage),
      props: { title: "传感器管理" }
    },
    {
      name: "authority",
      entry: "/microApp/authority.html",
      activeRule: pathsInclude(appPathMap.authority),
      props: { title: "系统管理" }
    },
    {
      name: "organization",
      entry: "/microApp/organization.html",
      activeRule: pathsInclude(appPathMap.organization),
      props: { title: "组织机构" }
    },
    {
      name: "deviceManage",
      entry: "/microApp/deviceManage.html",
      activeRule: pathsInclude(appPathMap.deviceManage),
      props: { title: "设备管理" }
    },
    // {
    //   name: "mapConfig",
    //   entry: "/microApp/mapConfig.html",
    //   activeRule: pathsInclude(appPathMap.mapConfig),
    //   props: { title: "底图配置" }
    // },
    {
      name: "qtouchGeo",
      entry: "/microApp/geographic.html",
      activeRule: pathsInclude(appPathMap.geographic),
      props: { title: "地理信息" }
    },
    {
      name: "personManage",
      entry: "/microApp/personManage.html",
      activeRule: pathsInclude(appPathMap.personManage),
      props: { title: "人员管理" }
    },
    {
      name: "vehicleManage",
      entry: "/microApp/vehicleManage.html",
      activeRule: pathsInclude(appPathMap.vehicleManage),
      props: { title: "车辆管理" }
    },
    {
      name: "buildingManage",
      entry: "/microApp/buildingManage.html",
      activeRule: pathsInclude(appPathMap.buildingManage),
      props: { title: "建筑管理" }
    },
    {
      name: "codeRuleManage",
      entry: "/microApp/codeRuleManage.html",
      activeRule: pathsInclude(appPathMap.codeRuleManage),
      props: { title: "编码规则" }
    },
    {
      name: "regions",
      entry: "/microApp/regions.html",
      activeRule: pathsInclude(appPathMap.regions),
      props: { title: "行政区划" }
    },
    {
      name: "openPlatform",
      entry: "/microApp/openPlatform.html",
      activeRule: pathsInclude(appPathMap.openPlatform),
      props: { title: "开放平台" }
    },
    {
      name: "openPath",
      entry: "/microApp/openPath.html",
      activeRule: pathsInclude(appPathMap.openPath),
      props: { title: "开放平台" }
    },
    {
      name: "businessObjectManage",
      entry: "/microApp/businessObjectManage.html",
      activeRule: pathsInclude(appPathMap.businessObjectManage),
      props: { title: "业务对象管理" }
    },
    {
      name: "locationManage",
      entry: "/microApp/locationManage.html",
      activeRule: pathsInclude(appPathMap.locationManage),
      props: { title: "定位管理" }
    }
  ].map(d => ({
    ...d,
    entry: d.entry + "?v=" + Date.now()
  }));
  return {
    accessTokenKey: "accessToken",
    appPathMap: appPathMap,
    manifest: manifest
  };
}));
