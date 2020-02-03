// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require("mongoose");
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect("mongodb://localhost/leiblog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 为这次连接绑定事件
const db = mongoose.connection;
db.once("error", () => console.log("Mongo connection error"));
db.once("open", () => console.log("Mongo connection successed"));

//用户
const userSchema = new mongoose.Schema({
  account: String,
  password: String,
  nickname: String,
  isadmin: Boolean,
  token: String
});
//文章
const articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  gist: String,
  content: String,
  clicktime: Number
});
//个人简介
const AboutSchema = new mongoose.Schema({
  content: String,
  updatetime: String,
  avatarBase64: String,
  email: String,
  phone: String,
  detailContent: String
});

const HomeSchema = new mongoose.Schema({
  linkId: String,
  title: String,
  gist: String,
  coverBase64: String,
  proments: Array
});

// Life
const lifeSchema = new mongoose.Schema({
  type: String,
  title: String,
  gist: String,
  content: String,
  coverBase64: String,
  tag: String,
  videolink: String,
  createtime: String,
  updatetime: String,
  clicktime: Number
});
// Technical
const technicalSchema = new mongoose.Schema({
  type: String,
  title: String,
  gist: String,
  content: String,
  tag: String,
  coverBase64: String,
  videolink: String,
  createtime: String,
  updatetime: String,
  clicktime: Number
});
//资料下载
const downloadSchema = new mongoose.Schema({
  name: String,
  gist: String,
  downloadlink: String,
  updatetime: String,
  downloadtime: Number
});
//用户留言
const messageSchema = new mongoose.Schema({
  title: String,
  nickname: String,
  email: String,
  phone: String,
  content: String,
  createtime: String,
  isreplied: Boolean,
  replycontent: String,
  replytime: String
});
// 访问记录
const historySchema = new mongoose.Schema({
  cip: String,
  cid: String,
  cname: String,
  os: String,
  browser: String,
  browserVersion: String,
  date: String
});
// 备案信息
const recordSchema = new mongoose.Schema({
  record1: String,
  record2: String
});
/************** 定义模型Model **************/

const Models = {
  User: mongoose.model("User", userSchema, "user"),
  Jqdt: mongoose.model("Jqdt", articleSchema, "jqdt"),
  About: mongoose.model("About", AboutSchema, "about"),
  Home: mongoose.model("Home", HomeSchema, "home"),
  Life: mongoose.model("Life", lifeSchema, "life"),
  Technical: mongoose.model("Technical", technicalSchema, "technical"),
  Material: mongoose.model("Material", downloadSchema, "material"),
  Tszs: mongoose.model("Tszs", articleSchema, "tszs"),
  Comment: mongoose.model("Comment", messageSchema, "comment"),
  History: mongoose.model("History", historySchema, "history"),
  Record: mongoose.model("Record", recordSchema, "record")
};

module.exports = Models;
