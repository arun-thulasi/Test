const router = require("express").Router();
const {
    loginUser
} = require("../controllers/login");
const {
    loginBodyValidation, validateRequests
} = require("../middlewares/validator");

router.post("/", loginBodyValidation(), validateRequests, loginUser);


module.exports = router;
