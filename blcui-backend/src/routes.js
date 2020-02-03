const Router = require("koa-router");
const { compose } = require("koa-convert");
const {
  UserController,
  JqdtController,
  GrjjController,
  CbzzController,
  JszlController,
  ZlxzController,
  YhlyController,
  TszsController,
  HistoryController,
  RecordController
} = require("./controllers");
const fileupload = require("./fileupload")

const userRoutes = new Router({ prefix: "/user" })
  .get("/detail", UserController.getDetail)
  .post("/search", UserController.search)
  .post("/checkInfo", UserController.checkoutInfo);
const jqdtRoutes = new Router({ prefix: "/jqdt" })
  .get("/articleDetail/:id", JqdtController.getOneArticle)
  .post("/articalList", JqdtController.getArticle)
  .post("/saveArticle", JqdtController.saveArticle)
  .post("/updateArticle", JqdtController.updateArticle)
  .post("/deleteArticle", JqdtController.deleteArticle)
  .post("/uploadImage", JqdtController.uploadImage);
const grjjRoutes = new Router({ prefix: "/grjj" })
  .post("/detail", GrjjController.getInfo)
  .post("/updateDetail", GrjjController.updateInfo);
const cbzzRoutes = new Router({ prefix: "/cbzz" })
  .get("/bookDetail/:id", CbzzController.getOneBook)
  .post("/bookList", CbzzController.getBooks)
  .post("/saveBook", CbzzController.saveBook)
  .post("/updateBook", CbzzController.updateBook)
  .post("/deleteBook", CbzzController.deleteBook);
const jszlRoutes = new Router({ prefix: "/jszl" })
  .get("/articleDetail/:id", JszlController.getOneArticle)
  .post("/articalList", JszlController.getArticle)
  .post("/saveArticle", JszlController.saveArticle)
  .post("/updateArticle", JszlController.updateArticle)
  .post("/deleteArticle", JszlController.deleteArticle)
  .post("/uploadfile", JszlController.uploadFile);
const zlxzRoutes = new Router({ prefix: "/zlxz" })
  .get("/fileDetail/:id", ZlxzController.getOneFile)
  .post("/fileList", ZlxzController.getFile)
  .post("/saveFile", ZlxzController.saveFile)
  .post("/updateFile", ZlxzController.updateFile)
  .post("/deleteFile", ZlxzController.deleteFile)
  .post("/uploadfile", ZlxzController.uploadFile);
const yhlyRoutes = new Router({ prefix: "/yhly" })
  .post("/messageList", YhlyController.getMessage)
  .post("/updateMessage", YhlyController.updateMessage)
  .post("/deleteMessage", YhlyController.deleteMessage)
  .post("/saveMessage", YhlyController.saveMessage);
const tszsRoutes = new Router({ prefix: "/tszs" })
  .get("/articleDetail/:id", TszsController.getOneArticle)
  .post("/articalList", TszsController.getArticle)
  .post("/saveArticle", TszsController.saveArticle)
  .post("/updateArticle", TszsController.updateArticle)
  .post("/deleteArticle", TszsController.deleteArticle)
  .post("/uploadImage", TszsController.uploadImage);
const historyRoutes = new Router({ prefix: "/history"})
  .post("/getVisit",HistoryController.getCount)
  .post("/updateHistory", HistoryController.updateHistory)
const recordRoutes = new Router({ prefix: "/record"})
  .post('/getRecord', RecordController.getInfo)
  .post('/updateRecord', RecordController.updateRecord)
const fileRoutes = new Router({prefix:"/file"})
  .post('/uploadBigFile', fileupload.uploadBigFile)
  .post("/uploadBigFileFinish", fileupload.uploadBigFileFinish)
PREFIX = "/api";
const router = new Router({ prefix: PREFIX })
  .use(userRoutes.routes())
  .use(jqdtRoutes.routes())
  .use(grjjRoutes.routes())
  .use(cbzzRoutes.routes())
  .use(jszlRoutes.routes())
  .use(zlxzRoutes.routes())
  .use(yhlyRoutes.routes())
  .use(tszsRoutes.routes())
  .use(historyRoutes.routes())
  .use(recordRoutes.routes())
  .use(fileRoutes.routes());

module.exports = () => compose([router.routes(), router.allowedMethods()]);
