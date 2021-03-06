const Router = require("koa-router");
const { compose } = require("koa-convert");
const {
  UserController,
  AboutController,
  HomeController,
  TechnicalController,
  LifeController,
  MaterialController,
  CommentController,
  HistoryController,
  RecordController
} = require("./controllers");
const fileupload = require("./fileupload");

const userRoutes = new Router({ prefix: "/user" })
  .get("/detail", UserController.getDetail)
  .post("/search", UserController.search)
  .post("/checkInfo", UserController.checkoutInfo);
const AboutRoutes = new Router({ prefix: "/about" })
  .post("/detail", AboutController.getInfo)
  .post("/updateDetail", AboutController.updateInfo);
const HomeRoutes = new Router({ prefix: "/home" })
  .post("/detail", HomeController.getInfo)
  .post("/updateDetail", HomeController.updateInfo);
const TechnicalRoutes = new Router({ prefix: "/technical" })
  .get("/articleDetail/:id", TechnicalController.getOneArticle)
  .post("/articalList", TechnicalController.getArticle)
  .post("/saveArticle", TechnicalController.saveArticle)
  .post("/updateArticle", TechnicalController.updateArticle)
  .post("/updateClick", TechnicalController.updateClick)
  .post("/deleteArticle", TechnicalController.deleteArticle)
  .post("/uploadfile", TechnicalController.uploadFile);
const LifeRoutes = new Router({ prefix: "/life" })
  .get("/articleDetail/:id", LifeController.getOneArticle)
  .post("/articalList", LifeController.getArticle)
  .post("/saveArticle", LifeController.saveArticle)
  .post("/updateArticle", LifeController.updateArticle)
  .post("/updateClick", LifeController.updateClick)
  .post("/deleteArticle", LifeController.deleteArticle)
  .post("/uploadfile", LifeController.uploadFile);
const MaterialRoutes = new Router({ prefix: "/material" })
  .get("/fileDetail/:id", MaterialController.getOneFile)
  .post("/fileList", MaterialController.getFile)
  .post("/saveFile", MaterialController.saveFile)
  .post("/updateFile", MaterialController.updateFile)
  .post("/updateClick", MaterialController.updateClick)
  .post("/deleteFile", MaterialController.deleteFile)
  .post("/uploadfile", MaterialController.uploadFile);
const CommentRoutes = new Router({ prefix: "/comment" })
  .post("/messageList", CommentController.getMessage)
  .post("/updateMessage", CommentController.updateMessage)
  .post("/deleteMessage", CommentController.deleteMessage)
  .post("/saveMessage", CommentController.saveMessage);
const historyRoutes = new Router({ prefix: "/history" })
  .post("/getVisit", HistoryController.getCount)
  .post("/updateHistory", HistoryController.updateHistory);
const recordRoutes = new Router({ prefix: "/record" })
  .post("/getRecord", RecordController.getInfo)
  .post("/updateRecord", RecordController.updateRecord);
const fileRoutes = new Router({ prefix: "/file" })
  .post("/uploadBigFile", fileupload.uploadBigFile)
  .post("/uploadBigFileFinish", fileupload.uploadBigFileFinish);
PREFIX = "/api";
const router = new Router({ prefix: PREFIX })
  .use(userRoutes.routes())
  .use(AboutRoutes.routes())
  .use(MaterialRoutes.routes())
  .use(TechnicalRoutes.routes())
  .use(LifeRoutes.routes())
  .use(CommentRoutes.routes())
  .use(historyRoutes.routes())
  .use(recordRoutes.routes())
  .use(fileRoutes.routes())
  .use(HomeRoutes.routes());

module.exports = () => compose([router.routes(), router.allowedMethods()]);
