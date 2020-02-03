const Yhly = require("../db").Yhly;

getAll = async Messages => {
  let dataSend = [];
  for (let i = 0; i < Messages.length; i++) {
    const element = Messages[i];
    let obj = {
      _id: element["_id"],
      title: element["title"],
      nickname: element["nickname"],
      email: element["email"],
      content: element["content"],
      createtime: element["createtime"],
      phone: element["phone"],
      isreplied: element["isreplied"],
      replycontent: element["replycontent"],
      replytime: element["replytime"]
    };
    dataSend.push(obj);
  }
  let dataReplied = [];
  dataSend.forEach(element => {
    if (element.isreplied) {
      dataReplied.push(element);
    }
  });
  return { dataSend, dataReplied };
};

module.exports = {
  getMessage: async ctx => {
    let page = ctx.request.body.page;
    let limit = ctx.request.body.limit;
    if (!page) {
      page = 1;
    }

    let Messages = await Yhly.find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    let { dataSend, dataReplied } = await getAll(Messages);
    let totalLength = await Yhly.find({'isreplied':true}).countDocuments();
    ctx.body = {
      success: true,
      message: dataSend,
      showMessage: dataReplied,
      totalLength: totalLength
    };
  },
  saveMessage: async ctx => {
    let request = ctx.request;
    let Info = request.body["info"];
    let newMsh = new Yhly(Info);
    await newMsh.save(err => {
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
  updateMessage: async ctx => {
    let request = ctx.request;
    let Info = request.body["info"];
    console.log(Info);
    await Yhly.findById(Info._id, (err, res) => {
      if (err) throw err;
      else {
        let obj = {
          isreplied: true,
          replycontent: Info["replycontent"],
          replytime: Info["replytime"]
        };
        Yhly.updateOne({ _id: Info._id }, obj, err => {
          if (err) throw err;
          else console.log("更新" + Info._id + "成功");
        });
      }
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  deleteMessage: async ctx => {
    let request = ctx.request;
    let Id = request.body["id"];
    await Yhly.deleteOne({ _id: Id }, (err, res) => {
      if (err) throw err;
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  }
};
