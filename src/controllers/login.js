const fs = require('fs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const  JWT_SECRET  = "todo_app_validate"

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const usersList = fs.readFileSync(__dirname+'\\user.json', 'utf8');
        const parsedList = JSON.parse(usersList);
        const filterdUser = parsedList.find(user => user.username === username);
        if (_.isEmpty(filterdUser)) {
            return res.status(400).send({ message: "No User" });
        }

       
        if (password === filterdUser.password) {
            const token = jwt.sign({ id: filterdUser.id }, JWT_SECRET);
            return res.status(200).send({ message: "User logged in", token });
        } else {
            return res.status(401).send({ message: "Invalid credentials" });
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginUser
}
