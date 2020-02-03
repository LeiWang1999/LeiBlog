const Cbzz = require("../db").Cbzz;

module.exports = {
  getBooks: async ctx => {
    let page = ctx.request.body.page;
    if (!page) {
      page = 1;
    }
    let limit = ctx.request.body.limit;
    let totalLength = await Cbzz.countDocuments();
    let res = await Cbzz.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    let dataSend = [];
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      let obj = {
        _id: element["_id"],
        name: element["name"],
        gist: element["gist"],
        content: element["content"],
        coverBase64: element["coverBase64"],
        buylink: element["buylink"],
        updatetime: element["updatetime"],
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

  getOneBook: async ctx => {
    let bookId = ctx.params.id;
    let prev = {};
    let next = {};
    let otherinfo = {};
    let res1 = await Cbzz.findOne({ _id: bookId });
    let res2 = await Cbzz.find({ _id: { $gt: bookId } });
    if (res2.length > 0) {
      prev.name = res2[0]["name"];
      prev._id = res2[0]["_id"];
    }
    let res3 = await Cbzz.find({ _id: { $lt: bookId } });

    if (res3.length > 0) {
      next.name = res3[res3.length - 1]["name"];
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
  saveBook: async ctx => {
    let request = ctx.request;
    let bookInfo = request.body["bookInfo"];
    let newBook = new Cbzz(bookInfo);
    await newBook.save(err => {
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
  updateBook: async ctx => {
    let request = ctx.request;
    let bookInfo = request.body["bookInfo"];
    console.log(bookInfo);
    await Cbzz.findById(bookInfo._id, (err, res) => {
      if (err) throw err;
      else {
        let obj = {
          title: bookInfo.title,
          date: bookInfo.date,
          coverBase64: bookInfo.coverBase64,
          gist: bookInfo.gist,
          updatetime: bookInfo.updatetime,
          buylink: bookInfo.buylink,
          content: bookInfo.content,
          clicktime: bookInfo.clicktime
        };
        Cbzz.updateOne({ _id: bookInfo._id }, obj, err => {
          if (err) throw err;
          else console.log("更新" + bookInfo._id + "成功");
        });
      }
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  deleteBook: async ctx => {
    let request = ctx.request;
    let bookId = request.body["bookId"];
    console.log(bookId);
    await Cbzz.deleteOne({ _id: bookId }, (err, res) => {
      if (err) throw err;
      ctx.body = {
        success: true,
        message: "更新成功"
      };
    });
  }
};
