const Jqdt = require("../db").Jqdt;
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
    let result = await Jqdt.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    let totalLength = await Jqdt.countDocuments();
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
    let otherinfo = {};

    let res1 = await Jqdt.findOne({ _id: articleId });
    let res2 = await Jqdt.find({ _id: { $gt: ctx.params.id } });
    if (res2.length > 0) {
      prev.title = res2[0]["title"];
      prev._id = res2[0]["_id"];
    }
    let res3 = await Jqdt.find({ _id: { $lt: ctx.params.id } });

    if (res3.length > 0) {
      next.title = res3[res3.length - 1]["title"];
      next._id = res3[res3.length - 1]["_id"];
    }
    otherinfo.prev = prev;
    otherinfo.next = next;
    ctx.body = {
      success: true,
      info: res1,
      otherinfo: otherinfo
    };
  },
  saveArticle: async ctx => {
    let request = ctx.request;
    let articleInfo = request.body["articleInfo"];
    console.log(articleInfo);
    let newArticle = new Jqdt(articleInfo);
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
    await Jqdt.findById(articleInfo._id, (err, res) => {
      if (err) throw err;
      else {
        let obj = {
          title: articleInfo.title,
          date: articleInfo.date,
          gist: articleInfo.gist,
          content: articleInfo.content,
          clicktime: articleInfo.clicktime
        };
        Jqdt.updateOne({ _id: articleInfo._id }, obj, err => {
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
    await Jqdt.deleteOne({ _id: articleId }, (err, res) => {
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
      "../../../blcui-fonted/public/image/jqdt/" + D + ".jpg"
    );
    let sendPath = "/image/jqdt/" + D + ".jpg";
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
