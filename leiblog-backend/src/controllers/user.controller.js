const { User, Technical, Life, Material } = require("../db");

getTechnicalResult = async reg => {
  const resultTechnical = await Technical.find({
    $or: [
      //多条件，数组
      { title: { $regex: reg } },
      { gist: { $regex: reg } },
      { createtime: { $regex: reg } },
      { content: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};

  resultTechnical.forEach(element => {
    obj._id = element._id;
    obj.title = element.title;
    obj.createtime = element.createtime;
    obj.clicktime = element.clicktime;
    obj.type = element.type;
    result.push(obj);
    result.forEach(e=>{
      console.log(e.title)
    })
  });

  return result;
};
getLifeResult = async reg => {
  const resultLife = await Life.find({
    $or: [
      //多条件，数组
      { title: { $regex: reg } },
      { gist: { $regex: reg } },
      { createtime: { $regex: reg } },
        { content: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultLife.forEach(element => {
    obj._id = element._id;
    obj.title = element.title;
    obj.gist = element.gist;
    obj.date = element.createtime;
    obj.clicktime = element.clicktime;
    obj.type = element.type;
    result.push(obj);
  });
  return result;
};



getMaterialResult = async reg => {
  const resultMaterial = await Material.find({
    $or: [
      //多条件，数组
      { name: { $regex: reg } },
      { gist: { $regex: reg } },
      { updatetime: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultMaterial.forEach(element => {
    obj._id = element._id;
    obj.title = element.name;
    obj.date = element.updatetime;
    obj.downloadlink = element.downloadlink;
    obj.clicktime = element.downloadtime;
    obj.type = "material";
    result.push(obj);
  });
  return result;
};

module.exports = {
  getDetail: async ctx => {
    await User.find({}, (err, res) => {
      if (err) throw err;
      console.log("Call detail success");
      ctx.body = {
        success: true,
        message: res
      };
    });
  },
  checkoutInfo: async ctx => {
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;
    let userInfo =  await User.findOne({account:account})
    if(userInfo.password == password && userInfo.isadmin == true){
      ctx.body = {
        success:true
      }
    }else {
      ctx.body = {
        success:false
      }
    }
  },
  search: async ctx => {
    const keywords = ctx.request.body.keywords;
    const reg = new RegExp(keywords, "i"); //不区分大小写
    const resultTechnical = await getTechnicalResult(reg);
    const resultLife = await getLifeResult(reg);
    const resultMaterial = await getMaterialResult(reg);
    let result = [];

    result = result.concat(
      resultTechnical,
      resultLife,
      resultMaterial
    );
    ctx.body = {
      success: true,
      result: result
    };
  }
};
