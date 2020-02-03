const Home = require("../db").Home;

module.exports = {
  getInfo: async ctx => {
    let res = await Home.findOne({});
    let Info = {
      title: "",
      gist: "",
      linkId: "",
      coverBase64: "",
      proments: [null,null,null,null,null,null,null,null,null,null,null]
    }
    if(!res){
      let newInfo = new Home(Info);
      await newInfo.save();
      let res1 = await Home.findOne({});
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
  updateInfo: async ctx => {
    let obj = ctx.request.body.obj;
    console.log(obj);
    await Home.updateOne({}, obj, err => {
      if (err) throw err;
      else console.log("更新Home成功");
      ctx.body = {
        success: true
      };
    });
  }
};
