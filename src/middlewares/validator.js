const { validationResult, body, param } = require("express-validator");

const todoTaskBodyValidation = () => {
    return [
        body("name").exists().isString().withMessage("name is required"),
        body('status').custom((value, {req}) => {
            const status_type = ['Pending', 'In-Progress', 'Completed'];
            if (!status_type.includes(value)) {
              throw new Error('Unknown status type.');
            }
            return true;
          })
    ];
};

const paramValidation = () => {
    return [
        param("id")
            .exists()
            .isAlphanumeric()
            .isLength(24)
            .withMessage("Invalid Task ID supplied"),
    ];
};

const validateRequests = (req, res, next) => {
    const error = validationResult(req);

    if (error.isEmpty()) {
        return next();
    }

    return res.status(422).send({ success: false, error: error.array() });
};

const loginBodyValidation = () => {
    return [
        body('username').exists().isString().isLowercase(),
        body('password').exists().isString()
    ];
}
module.exports = {
    validateRequests,
    todoTaskBodyValidation,
    paramValidation,
    loginBodyValidation
};
