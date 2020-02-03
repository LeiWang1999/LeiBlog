const Record = require("../db").Record;

module.exports = {
  getInfo: async ctx => {
    let res = await Record.findOne({});
    let Info = {
      record1:"",
      record2:""
    }
    if(!res){
      let newInfo = new Record(Info);
      await newInfo.save();
      let res1 = await Record.findOne({});
      ctx.body = {
        success: true,
        data: res1
      };
    }
    ctx.body = {
      success: true,
      data: res
    };
  },
  updateRecord: async ctx => {
    let request = ctx.request;
    let Info = request.body["Info"];
    await Record.findById(Info._id, (err, res) => {
      if (err) throw err;
      else {
        let obj = {
          record1 : Info.record1,
          record2 : Info.record2
        };
        Record.updateOne({}, obj, err => {
          if (err) throw err;
          else console.log("更新" + "成功");
        });
      }
    });
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  }
};
