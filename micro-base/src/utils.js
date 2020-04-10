// 为资源添加统一前缀用于 nginx 转发
const publicPath = process.env.BASE_URL;

// 应用运行的路由
export function pathsInclude(paths) {
  let pathArr = Array.isArray(paths) ? paths : [paths];
  return (location) => pathArr.some((path) => location.pathname.startsWith(publicPath + path));
}

// 应用不运行的路由
export function pathsExclude(paths) {
  let pathArr = Array.isArray(paths) ? paths : [paths];
  return (location) => pathArr.every((path) => !location.pathname.startsWith(publicPath + path));
}
