const Tszs = require("../db").Tszs;
const multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");

module.exports = {
  getArticle: async ctx => {
    let page = ctx.request.body.page;
    let limit = ctx.request.body.limit;
    if (!page) {
      page = 1;
    }
    let result = await Tszs.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    let totalLength = await Tszs.countDocuments();
    let dataSend = [];
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      let obj = {
        _id: element["_id"],
        date: element["date"],
        title: element["title"],
        gist: element["gist"],
        content: element["content"],
        clicktime: element["clicktime"]
      };
      dataSend.push(obj);
    }
    ctx.body = {
      success: true,
      message: dataSend,
      totalLength: totalLength
    };
  },

  getOneArticle: async ctx => {
    let articleId = ctx.params.id;
    let prev = {};
    let next = {};
    let res = {};
    let otherinfo = {};

    await Tszs.findOne({ _id: articleId }, (err, res1) => {
      if (err) throw err;
      else {
        res = res1;
      }
    });
    await Tszs.find({ _id: { $gt: ctx.params.id } }, (err, res2) => {
      if (err) throw err;
      if (res2.length > 0) {
        prev.title = res2[0]["title"];
        prev._id = res2[0]["_id"];
      }
    });
    await Tszs.find({ _id: { $lt: ctx.params.id } }, (err, res3) => {
      if (err) throw err;
      if (res3.length > 0) {
        next.title = res3[res3.length - 1]["title"];
        next._id = res3[res3.length - 1]["_id"];
      }
      otherinfo.prev = prev;
      otherinfo.next = next;
    });
    ctx.body = {
      success: true,
      info: res,
      otherinfo: otherinfo
    };
  },
  saveArticle: async ctx => {
    let request = ctx.request;
    let articleInfo = request.body["articleInfo"];
    console.log(articleInfo);
    let newArticle = new Tszs(articleInfo);
    await newArticle.save(err => {
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
  updateArticle: async ctx => {
    let request = ctx.request;
    let articleInfo = request.body["articleInfo"];
    console.log(articleInfo);
    await Tszs.findById(articleInfo._id, (err, res) => {
      if (err) throw err;
      else {
        let obj = {
          title: articleInfo.title,
          date: articleInfo.date,
          gist: articleInfo.gist,
          content: articleInfo.content,
          clicktime: articleInfo.clicktime
        };
        Tszs.updateOne({ _id: articleInfo._id }, obj, err => {
          if (err) throw err;
          else console.log("更新" + articleInfo._id + "成功");
        });
      }
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  deleteArticle: async ctx => {
    let request = ctx.request;
    let articleId = request.body["articleId"];
    console.log(articleId);
    await Tszs.deleteOne({ _id: articleId }, (err, res) => {
      if (err) throw err;
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  uploadImage: async ctx => {
    let form = new multiparty.Form();
    let D = Date.now();
    let saveImg = path.join(
      __dirname,
      "../../../blcui-fonted/public/image/Tszs/" + D + ".jpg"
    );
    let sendPath = "/image/Tszs/" + D + ".jpg";
    form.parse(ctx.req, (err, fields, files) => {
      let input = files.upload_file[0];
      const reader = fs.createReadStream(input.path); // 创建可读流
      const ext = input.originalFilename.split(".").pop(); // 获取上传文件扩展名
      const upStream = fs.createWriteStream(saveImg); // 创建可写流
      reader.pipe(upStream);
    });
    ctx.body = {
      success: true,
      path: sendPath
    };
  }
};
