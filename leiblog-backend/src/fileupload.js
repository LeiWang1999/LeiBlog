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
var COS = require('cos-nodejs-sdk-v5');

var cos = new COS({
  SecretId: 'AKIDfFxQdbMU5QXTCmuGagaGiz1qPjqiD6fy',
  SecretKey: 'DNI1Zsw2e3CDeqnVzDB0c094kCXWdXFi',
});

var tengxun_cos = {
  Bucket: 'leiblog-1301208363',
  Region: 'ap-nanjing',
}

// 文件上传

module.exports = {
  uploadBigFile: async (ctx, next) => {
    let form = new multiparty.Form();
    let uploadPath = path.resolve(__dirname, "../upload"); //'F:\\aitools_node\\upload'
    // 根据文件hash创建文件夹，把默认上传的文件移动当前hash文件夹下。方便后续文件合并。

    let { fields, uploadfile } = await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (files) {
          let uploadfile = files.file[0];
          resolve({ fields, uploadfile });
        } else {
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
    let { timestamp, name, size, total } = fields;
    name = name[0];
    let newFileDir = fileStorePath + "/" + curDate;
    let newFilePath = newFileDir + "/" + name;
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
          if (existed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
      let key = Date.now() + name;
      let FileSrc = 'https://leiblog-1301208363.cos.ap-nanjing.myqcloud.com/' + key;;
      if (existed) {
        var params = {
          Bucket: tengxun_cos.Bucket,                         /* 必须 */
          Region: tengxun_cos.Region,                         /* 必须 */
          Key: key,                                           /* 必须 */
          FilePath: filePath,                                /* 必须 */
        }
        cos.sliceUploadFile(params, function (err, data) {
          if (err) {
            throw err;
          } else {
            fs.renameSync(filePath, newFilePath)
          }
        }); //重命名
      } else {
        fs.mkdir(newFileDir, function (err) {
          if (err) throw err;
          var params = {
            Bucket: tengxun_cos.Bucket,                         /* 必须 */
            Region: tengxun_cos.Region,                         /* 必须 */
            Key: key,                                           /* 必须 */
            FilePath: filePath,                                /* 必须 */
          }
          cos.sliceUploadFile(params, function (err, data) {
            if (err) {
              throw err;
            } else {
              fs.renameSync(filePath, newFilePath);
            }
          }); //重命名
        })
      }

      console.log(FileSrc)
      ctx.body = {
        code: 1,
        msg: "切片文件合并成功",
        data: {
          downloadPath: FileSrc,
          showPath: downloadPath,
          url: timestamp + name
        }
      };
    }
  }
};
