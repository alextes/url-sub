import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  // ES Modules
  {
    external: ["query-string"],
    input: "src/index.ts",
    output: {
      file: "dist/index.es.js",
      format: "es",
    },
    plugins: [
      typescript(),
      babel({
        extensions: [".ts"],
        babelHelpers: "bundled",
      }),
    ],
  },

  // UMD
  {
    external: ["query-string"],
    input: "src/index.ts",
    output: {
      file: "dist/index.umd.min.js",
      format: "umd",
      name: "urlSub",
      indent: false,
      globals: {
        "query-string": "query-string",
      },
    },
    plugins: [
      typescript(),
      babel({
        extensions: [".ts"],
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      terser(),
    ],
  },
];
