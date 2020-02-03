const { User, Cbzz, Jqdt, Jszl, Tszs, Zlxz } = require("../db");

getJqdtResult = async reg => {
  const resultJqdt = await Jqdt.find({
    $or: [
      //多条件，数组
      { title: { $regex: reg } },
      { gist: { $regex: reg } },
      { date: { $regex: reg } },
      { content: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultJqdt.forEach(element => {
    obj._id = element._id;
    obj.title = element.title;
    obj.date = element.date;
    obj.clicktime = element.clicktime;
    obj.type = "jqdt";
    result.push(obj);
  });
  return result;
};
getJszlResult = async reg => {
  const resultJszl = await Jszl.find({
    $or: [
      //多条件，数组
      { title: { $regex: reg } },
      { gist: { $regex: reg } },
      { createtime: { $regex: reg } }
      //   { content: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultJszl.forEach(element => {
    obj._id = element._id;
    obj.title = element.title;
    obj.gist = element.gist;
    obj.date = element.createtime;
    obj.clicktime = element.clicktime;
    obj.type = "jszl";
    result.push(obj);
  });
  return result;
};
getTszsResult = async reg => {
  const resultTszs = await Tszs.find({
    $or: [
      //多条件，数组
      { title: { $regex: reg } },
      { gist: { $regex: reg } },
      { date: { $regex: reg } },
      { content: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultTszs.forEach(element => {
    obj._id = element._id;
    obj.title = element.title;
    obj.gist = element.gist;
    obj.date = element.date;
    obj.clicktime = element.clicktime;
    obj.type = "tszs";
    result.push(obj);
  });
  return result;
};

getCbzzResult = async reg => {
  const resultCbzz = await Cbzz.find({
    $or: [
      //多条件，数组
      { name: { $regex: reg } },
      { gist: { $regex: reg } },
      { content: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultCbzz.forEach(element => {
    obj._id = element._id;
    obj.title = element.name;
    obj.gist = element.gist;
    obj.updatetime = element.updatetime;
    obj.clicktime = element.clicktime;
    obj.type = "cbzz";
    result.push(obj);
  });
  return result;
};

getZlxzResult = async reg => {
  const resultZlxz = await Zlxz.find({
    $or: [
      //多条件，数组
      { name: { $regex: reg } },
      { gist: { $regex: reg } },
      { updatetime: { $regex: reg } }
    ]
  }).sort({ _id: -1 });
  let result = [];
  let obj = {};
  resultZlxz.forEach(element => {
    obj._id = element._id;
    obj.title = element.name;
    obj.date = element.updatetime;
    obj.downloadlink = element.downloadlink;
    obj.clicktime = element.downloadtime;
    obj.type = "zlxz";
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

    const resultJqdt = await getJqdtResult(reg);
    const resultJszl = await getJszlResult(reg);
    const resultTszs = await getTszsResult(reg);
    const resultCbzz = await getCbzzResult(reg);
    const resultZlxz = await getZlxzResult(reg);
    let result = [];

    result = result.concat(
      resultCbzz,
      resultJqdt,
      resultJszl,
      resultTszs,
      resultZlxz
    );
    ctx.body = {
      success: true,
      result: result
    };
  }
};
