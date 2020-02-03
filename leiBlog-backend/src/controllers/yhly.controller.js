const Yhly = require("../db").Yhly;

module.exports = {
  getMessage: async ctx => {
    await Yhly.find({}, (err, res) => {
      if (err) throw err;
      let dataSend = [];
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
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
      dataSend.forEach(element=>{
        if (element.isreplied){
          dataReplied.push(element);
        }
      })
      ctx.body = {
        success: true,
        message: dataSend,
        showMessage: dataReplied
      };
    });
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
    console.log(Info)
    await Yhly.findById(Info._id,(err,res)=>{
        if (err)    throw err
        else {
            let obj = {
              isreplied: true,
              replycontent: Info["replycontent"],
              replytime: Info["replytime"]
            };
            Yhly.updateOne({_id:Info._id},obj,err=>{
                if (err) throw err
                else console.log("更新"+Info._id+"成功")
            })
        }
    })
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  deleteMessage: async ctx => {
    let request = ctx.request;
    let Id = request.body["id"];
    await Yhly.deleteOne({_id:Id}, (err,res)=>{
        if (err)
            throw err

    })
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
 
};
