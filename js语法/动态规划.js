function f1 (n) {
  const cache = new Map();

  function f(n) {
    if(n === 0) return 0
    let cacheRes = cache.get(n)
    if (cacheRes) {
      return cacheRes
    }
    let min = Infinity
    if (n >= 1) {
      min = Math.min(f(n-1) + 1, min)
    }

    if (n >= 5) {
      min = Math.min(f(n-5) + 1, min)
    }

    if (n >= 11) {
      min = Math.min(f(n-11) + 1, min)
    }

    cache.set(n, min)

    return min
  }

  console.time("time:")
  console.log(f(n));
  console.timeEnd("time:")
}

f1(100)

const coinChange = (coins, amount) => {
  // 初始化备忘录,用Infinity填满备忘录，Infinity说明该值不可以用硬币凑出来
  const dp = new Array(amount + 1).fill(Infinity)

  // 设置初始条件为 0
  dp[0] = 0

  for (var i = 1; i <= amount; i++) {
    for (const coin of coins) {
      // 根据动态转移方程求出最小值
      if (coin <= i) {
        console.log(dp[i], dp[i - coin] + 1);
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  // 如果 `dp[amount] === Infinity`说明没有最优解返回-1,否则返回最优解
  return dp[amount] === Infinity ? -1 : dp[amount]
}
console.time("time1:")
console.log(coinChange([1, 5, 11], 100));
console.timeEnd("time1:")
