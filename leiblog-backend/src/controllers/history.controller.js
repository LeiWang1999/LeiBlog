const History = require("../db").History;

module.exports = {
  getCount: async ctx => {
    let date = ctx.request.body.date;
    let dateBefore = ctx.request.body.dateBefore;
    let reg = new RegExp(date, "i"); //不区分大小写
    const resultHistoryToday = await History.find({
      $or: [{ date: { $regex: reg } }]
    }).sort({ _id: -1 });
    reg = new RegExp(dateBefore, "i"); //不区分大小写

    const resultHistoryBefore = await History.find({
      $or: [{ date: { $regex: reg } }]
    }).sort({ _id: -1 });
    ctx.body = {
        success:true,
        uvToday : resultHistoryToday.length,
        uvBefore: resultHistoryBefore.length
    }
  },
  updateHistory: async ctx => {
    let request = ctx.request;
    let Info = request.body["info"];
    let newHis = new History(Info);
    await newHis.save(err => {
      if (err) throw err;
    });
    ctx.body = {
      success: true,
      message: "保存成功"
    };
  }
};
