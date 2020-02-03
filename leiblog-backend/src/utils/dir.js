const path = require('path');
const fs = require('fs-extra');
// mkdirsSync函数
const mkdirsSync = (dirname) => {
  if(fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
module.exports = {
  mkdirsSync
};

