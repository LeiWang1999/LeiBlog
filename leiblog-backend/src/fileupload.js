const { mkdirsSync } = require("./utils/dir");
const multiparty = require("multiparty");
const fileStorePath = require("../config").fileStorePath;
const fileServerPath = require("../config").fileServerPath;
const fs = require("fs");
const path = require("path");
const {
  MyDate,
  DATE_FORMATTER,
  DATE_ENUM,
  DATE_PROP_TYPE
} = require("myjs-common");
// 文件上传

module.exports = {
  uploadBigFile: async (ctx, next) => {
    let form = new multiparty.Form();
    let uploadPath = path.resolve(__dirname, "../upload"); //'F:\\aitools_node\\upload'
    // 根据文件hash创建文件夹，把默认上传的文件移动当前hash文件夹下。方便后续文件合并。

    let { fields, uploadfile } = await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if(files){
          let uploadfile = files.file[0];
          resolve({ fields, uploadfile });
        }else{
          ctx.body = {
            code: 0,
            msg: "上传失败继续传输"
          };
        }
      });
    });
    const { timestamp, name, size, total, index } = fields;
    const chunksPath = path.join(uploadPath, `/file_temp${timestamp}/`); //F:\aitools_node\upload\/file_temp${timestamp}/
    if (!fs.existsSync(chunksPath)) {
      //判断文件夹是否存在
      mkdirsSync(chunksPath);
    }
    fs.renameSync(uploadfile.path, chunksPath + timestamp + name); //改名字
    ctx.body = {
      code: 1,
      msg: "上传成功，可继续传输"
    };
  },

  uploadBigFileFinish: async (ctx, next) => {
    let now = new MyDate();
    let curDate = now.format(DATE_FORMATTER.DATE_FORMAT);
    
    let uploadPath = path.resolve(__dirname, "../upload"); //'F:\\aitools_node\\upload'

    let form = new multiparty.Form();
    let fields = await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        resolve(fields);
      });
    });
    const { timestamp, name, size, total } = fields;
    let newFileDir = fileStorePath + "/" + curDate;
    let newFilePath = newFileDir + "/" + name ;
    let downloadPath = fileServerPath + "/" + curDate + "/" + name;

    // 创建存储文件
    // 合并
    const chunksPath = path.join(uploadPath, `/file_temp${timestamp}/`); //F:\aitools_node\upload\
    const filePath = path.join(uploadPath, timestamp + name); //生成的文件名
    // 读取所有的chunks 文件名存放在数组中
    const chunks = fs.readdirSync(chunksPath); //读取目录下的所有文件
    // 创建存储文件
    if (chunks.length != total || chunks.length == 0) {
      ctx.body = {
        code: 1,
        msg: "切片文件数量不符合"
      };
      chunks.forEach(item => {
        fs.unlinkSync(chunksPath + item);
      });
      fs.rmdirSync(chunksPath);
      return;
    } else {
      fs.writeFileSync(filePath, "");
      for (let i = 0; i < total; i++) {
        // 追加写入到文件中
        fs.appendFileSync(
          filePath,
          fs.readFileSync(chunksPath + timestamp + name + "." + i)
        );
        // 删除本次使用的chunk
        fs.unlinkSync(chunksPath + timestamp + name + "." + i);
      }
      fs.rmdirSync(chunksPath);
      // 文件合并成功，可以把文件信息进行入库。

      let existed = await new Promise((resolve, reject) => {
        fs.exists(newFileDir, existed => {
          console.log(existed);
          if (existed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
      if (existed) {
        fs.renameSync(filePath, newFilePath); //重命名
      } else {
        fs.mkdir(newFileDir, function(err) {
          if (err) throw err;
          fs.renameSync(filePath, newFilePath); //重命名
        });
      }
      ctx.body = {
        code: 1,
        msg: "切片文件合并成功",
        data: {
          downloadPath: downloadPath,
          url: timestamp + name
        }
      };
    }
  }
};
