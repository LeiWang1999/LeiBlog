const Cbzz = require("../db").Cbzz;

module.exports = {
  getBooks: async ctx => {
    await Cbzz.find({}, (err, res) => {
      if (err) throw err;
      let dataSend = [];
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        let obj = {
          _id: element["_id"],
          name: element["name"],
          gist: element["gist"],
          coverBase64: element["coverBase64"],
          buylink: element["buylink"],
          updatetime: element["updatetime"]
        };
        dataSend.push(obj);
      }
      ctx.body = {
        success: true,
        message: dataSend
      };
    });
  },

  getOneBook: async ctx => {
    let bookId = ctx.params.id;
    await Cbzz.findOne({ _id: bookId }, (err, res) => {
      if (err) throw err;
      else {
        ctx.body = {
          success: true,
          info: res
        };
      }
    });
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
          content: bookInfo.content
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
