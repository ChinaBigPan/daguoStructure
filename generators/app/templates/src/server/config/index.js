import _ from 'lodash';
import path from 'path';

let normalConfig = {
  viewDir: path.join(__dirname, "../views"),
  staticDir: path.join(__dirname, "../assets")
};

/**
 * 根据场景采用设置
 */
const init = () => {
  if (process.env.NODE_ENV == "development") {
    const localConfig = {
      port: 8081
    }
    normalConfig = _.extend(normalConfig, localConfig);
  }

  if (process.env.NODE_ENV == "production") {
    const proConfig = {
      port: 90
    }
    normalConfig = _.extend(normalConfig, proConfig);
  }
  return normalConfig;
}

const result = init();
export default result;