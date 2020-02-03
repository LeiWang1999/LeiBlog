const About = require("../db").About;

module.exports = {
  getInfo: async ctx => {
    let res = await About.findOne({});
      ctx.body = {
        res
      };

  },
  updateInfo: async ctx => {
    let obj = ctx.request.body.obj;
    console.log(obj);
    await About.updateOne({}, obj, err => {
      if (err) throw err;
      else console.log("更新个人简介成功");
      ctx.body = {
        success: true
      };
    });
  }
};
