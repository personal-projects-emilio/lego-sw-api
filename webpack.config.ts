import path from "path";
import glob from "glob";
import * as fs from "fs";
import { Configuration } from "webpack";

const fileNames = fs
  .readdirSync("./src")
  .reduce((acc, v) => ({ ...acc, [v]: `./src/${v}` }), {});

const config: Configuration = {
  target: "node",
  entry: glob.sync("./src/**/*.ts"),
  // context: path.resolve(__dirname),
  externals: [
    /^[a-z\-0-9]+$/, // Ignore node_modules folder
  ],
  output: {
    // filename: "compiled", // output file
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules",
      path.resolve(__dirname, "node_modules"),
    ],
  },
  module: {
    rules: [
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        // exclude: ["src/global.d.ts"],
      },
    ],
  },
};

export default config;
