(function (e, t) {
  "object" === typeof exports && "object" === typeof module
  ? module.exports = t()
  : "function" === typeof define && define.amd ? define([], t) : "object" === typeof exports
  ? exports["micro_manifest"] =
  t()
  : e["micro_manifest"] = t();
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
    navBar: "/navBar",
    login: "/login",
    errorPage: "/error",
    root: "/root",
    eventCenter: "/eventCenter",
    userManage: "/userManage",
    processManage: "/qtouchProcess",
    authority: "/qtouchSysMenu",
    myProcess: "/userMenu",
    organization: "/organization_manage",
    personManage: "/personMng",
    projectManage: "/projectManage",
    communityManage: "/communityManage",
    planManage: "/planManage",
    jobProcessManage: "/jobProcessManage",
  };
  var manifest = [
    {
      name: "navBar",
      entry: "/microApp/navBar.html",
      activeRule: pathsExclude([appPathMap.login, appPathMap.errorPage])
    },
    {
      name: "root",
      entry: "/microApp/root.html",
      activeRule: pathsInclude(appPathMap.root),
      props: { title: "首页" }
    },
    {
      name: "baseLogin",
      entry: "/microApp/baseLogin.html",
      activeRule: pathsInclude(appPathMap.login),
      props: { title: "登录" }
    },
    {
      name: "errorPage",
      entry: "/microApp/errorPage.html",
      activeRule: pathsInclude(appPathMap.errorPage)
    },
    {
      name: "userManage",
      entry: "/microApp/userManage.html",
      activeRule: pathsInclude(appPathMap.userManage),
      props: { title: "人员管理" }
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
      name: "projectManage",
      entry: "/ljxqgz-font/projectManage.html",
      activeRule: pathsInclude(appPathMap.projectManage),
      props: { title: "项目管理" }
    },
    {
      name: "communityManage",
      entry: "/ljxqgz-font/communityManage.html",
      activeRule: pathsInclude(appPathMap.communityManage),
      props: { title: "老旧小区管理" }
    },
    {
      name: "planManage",
      entry: "/ljxqgz-font/planManage.html",
      activeRule: pathsInclude(appPathMap.planManage),
      props: { title: "建设计划管理" }
    },
    {
      name: "jobProcessManage",
      entry: "/ljxqgz-font/jobProcessManage.html",
      activeRule: pathsInclude(appPathMap.jobProcessManage),
      props: { title: "施工进度管理" }
    },
    {
      name: "personManage",
      entry: "/microApp/personManage.html",
      activeRule: pathsInclude(appPathMap.personManage),
      props: { title: "人员管理" }
    }
  ];
  return {
    appPathMap: appPathMap,
    manifest: manifest
  };
}));
