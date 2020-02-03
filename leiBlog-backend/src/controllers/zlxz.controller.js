const Zlxz = require("../db").Zlxz;

module.exports = {
  getFile: async ctx => {
    await Zlxz.find({}, (err, res) => {
      if (err) throw err;
      let dataSend = [];
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        let obj = {
          _id: element["_id"],
          updatetime: element["updatetime"],
          name: element["name"],
          gist: element["gist"],
          downloadlink: element["downloadlink"],
          downloadtime: element["downloadtime"]
        };
        dataSend.push(obj);
      }
      ctx.body = {
        success: true,
        message: dataSend
      };
    });
  },

  getOneFile: async ctx =>{
      let fileId =  ctx.params.id
      await Zlxz.findOne({_id:fileId},(err, res)=>{
          if (err) throw err
          else {
              ctx.body = {
                  success: true,
                  info:res
              }
          }
      })
  },
  saveFile: async ctx => {
    let request = ctx.request;
    let fileInfo = request.body["info"];
    let newFile = new Zlxz(fileInfo);
    await newFile.save(err => {
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
  updateFile: async ctx => {
    let request = ctx.request;
    let fileInfo = request.body["fileInfo"];
    console.log(fileInfo)
    await Zlxz.findById(fileInfo._id,(err,res)=>{
        if (err)    throw err
        else {
            let obj = {
                'name': fileInfo.name,
                'updatetime':fileInfo.updatetime,
                'gist':fileInfo.gist,
                'downloadlink':fileInfo.downloadlink,
                'downloadtime':fileInfo.downloadtime
            }
            Zlxz.updateOne({_id:fileInfo._id},obj,err=>{
                if (err) throw err
                else console.log("更新"+fileInfo._id+"成功")
            })
        }
    })
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
  deleteFile: async ctx => {
    let request = ctx.request;
    let fileId = request.body["fileId"];
    console.log(fileId)
    await Zlxz.deleteOne({_id:fileId}, (err,res)=>{
        if (err)
            throw err

    })
    ctx.body = {
      success: true,
      message: "更新成功"
    };
  },
 
};
