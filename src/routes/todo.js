const router = require("express").Router();
const {
    getTask,
    getAllTask,
    addMainTask,
    editTask,
    deleteTask
} = require("../controllers/todo");
const {
    todoTaskBodyValidation,
    validateRequests,
    paramValidation,
} = require("../middlewares/validator");
const {
    validateToken
} = require("../middlewares/validateToken");

router.get("/", validateToken, getAllTask);
router.get("/:id", validateToken, validateRequests, getTask);
router.post("/addtask", validateToken, todoTaskBodyValidation(), validateRequests, addMainTask);
router.put("/:id",validateToken, validateRequests, editTask);
router.delete("/:id",validateToken, paramValidation(), validateRequests, deleteTask);


module.exports = router;
