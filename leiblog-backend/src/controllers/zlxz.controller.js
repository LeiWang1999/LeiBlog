const Zlxz = require("../db").Zlxz;
const fileStorePath = require("../../config").fileStorePath;
const fileServerPath = require("../../config").fileServerPath;
const multiparty = require("multiparty");
const fs = require("fs");
const {
  MyDate,
  DATE_FORMATTER,
  DATE_ENUM,
  DATE_PROP_TYPE
} = require("myjs-common");

module.exports = {
  getFile: async ctx => {
    let page = ctx.request.body.page;
    let limit = ctx.request.body.limit;
    if (!page) {
      page = 1;
    }
    let totalLength = await Zlxz.countDocuments();
    let res = await Zlxz.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    let dataSend = [];
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      let obj = {
        _id: element["_id"],
        updatetime: element["updatetime"],
        name: element["name"],
        gist: element["gist"],
        downloadlink: element["downloadlink"],
        downloadtime: element["downloadtime"]
      };
      dataSend.push(obj);
    }
    ctx.body = {
      success: true,
      message: dataSend,
      totalLength: totalLength
    };
  },

  getOneFile: async ctx => {
    let fileId = ctx.params.id;
    await Zlxz.findOne({ _id: fileId }, (err, res) => {
      if (err) throw err;
      else {
        ctx.body = {
          success: true,
          info: res
        };
      }
    });
  },
  saveFile: async ctx => {
    let request = ctx.request;
    let fileInfo = request.body["info"];
    let newFile = new Zlxz(fileInfo);
    await newFile.save(err => {
      if (err) throw err;
      else {
        console.log("保存成功");
        ctx.body = {
          success: true,
          message: "保存成功"
        };
      }
    });
    ctx.body = {
      success: true,
      message: "保存成功"
    };
  },
  updateFile: async ctx => {
    let request = ctx.request;
    let fileInfo = request.body["fileInfo"];
    console.log(fileInfo);
    await Zlxz.findById(fileInfo._id, (err, res) => {
      if (err) throw err;
      else {
        let obj = {
          name: fileInfo.name,
          updatetime: fileInfo.updatetime,
          gist: fileInfo.gist,
          downloadlink: fileInfo.downloadlink,
          downloadtime: fileInfo.downloadtime
        };
        Zlxz.updateOne({ _id: fileInfo._id }, obj, err => {
          if (err) throw err;
          else console.log("更新" + fileInfo._id + "成功");
        });
      }
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  deleteFile: async ctx => {
    let request = ctx.request;
    let fileId = request.body["fileId"];
    console.log(fileId);
    await Zlxz.deleteOne({ _id: fileId }, (err, res) => {
      if (err) throw err;
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  uploadFile: async ctx => {
    let form = new multiparty.Form();
    let newFileDir = "";
    let newFilePath = "";
    let downloadPath = "";
    let uploadfile = await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        let uploadfile = files.file[0];
        resolve(uploadfile);
      });
    });
    let filename = uploadfile.originalFilename;
    let nameArray = filename.split(".");
    let type = nameArray[nameArray.length - 1];
    let name = "";
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    let now = new MyDate();
    newFileDir = fileStorePath + "/" + now.format(DATE_FORMATTER.DATE_FORMAT);
    newFilePath = newFileDir + "/" + name + "." + type;
    downloadPath =
      fileServerPath +
      "/" +
      now.format(DATE_FORMATTER.DATE_FORMAT) +
      "/" +
      name +
      "." +
      type;

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
    console.log("existed", existed);
    if (existed) {
      fs.renameSync(uploadfile.path, newFilePath); //重命名
    } else {
      fs.mkdir(newFileDir, function(err) {
        if (err) throw err;
        fs.renameSync(uploadfile.path, newFilePath); //重命名
      });
    }
    ctx.body = {
      success: true,
      downloadlink: downloadPath
    };
  }
};
