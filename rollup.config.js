import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
  input: "./utils/draggable.js",
  output: {
    file: "./lib/draggable.js",
    format: "umd",
    name: "draggable"
  },
  env: "production",
  plugins: [
    resolve(),
    cjs(),
    babel({
      exclude: "node_modules/**",
      presets: [
        [
          require.resolve("@babel/preset-env"),
          {
            targets: {
              esmodules: false,
              browsers: ["ie > 10" ]
            },
            // useBuiltIns: "usage",
            // corejs: 2
          }
        ]
      ]
    })
  ]
};
