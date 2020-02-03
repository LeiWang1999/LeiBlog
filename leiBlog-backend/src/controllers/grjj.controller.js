const Grjj = require("../db").Grjj;

module.exports = {
  getInfo: async ctx => {
    await Grjj.findOne({},(err,res)=>{
      if (err) throw err
      ctx.body = {
          res
      }
    });
  },
  updateInfo: async ctx=>{
    let obj = ctx.request.body.obj
    console.log(obj)
    await   Grjj.updateOne({},obj,err=>{
      if (err) throw err
      else console.log("更新个人简介成功")
      ctx.body = {
        success:true
      }
  })
  }
};
