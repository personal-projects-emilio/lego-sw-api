import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
};

export default config;
