async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2(){
  console.log('async2')
}

console.log('script start')

setTimeout(function(){
  console.log('setTimeout')
},0)

async1();

new Promise(function(resolve){
  console.log('promise1')
  resolve();
}).then(function(){
  console.log('promise2')
})
console.log('script end')

/**
 * 同步任务
 * script start
 * async1 start
 * async2 -> async1 end
 * promise1 -> promise2
 * script end
 * 异步任务
 * async1 end
 * promise2
 * setTimeout
 **/

/**
 * 自我介绍：
 * 很荣幸今天能够参加字节跳动的面试，我叫刘洋，今年23岁，于18年毕业于重庆邮电大学，
 * 毕业之后一直就职于中冶赛迪重庆信息技术有限公司，主要负责前端业务开发，前端基础技术架构，难点技术攻关等工作，
 * 工作中主要的项目经历有三个，技术上复杂的是简历上的在线流程图工具和自己实现的前端微应用框架，擅长vue技术栈，
 * 拥有相对扎实的前端基础，也有做过一些react的小项目，
 * 个人喜欢学习和研究新的前端技术，并且尝试把他们应用到实际工作中去，
 * 期待能够在字节接触到更多的业务，和更多的大佬一起交流学习
 **/
