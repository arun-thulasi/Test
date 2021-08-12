const router = require("express").Router();
const indexController = require("../controllers");
const todoRouter = require("./todo");
const loginRouter = require("./login");

router.get("/", indexController);
router.use("/todo", todoRouter);
router.use('/login',loginRouter);

module.exports = router;
