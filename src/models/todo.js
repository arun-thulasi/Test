const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    parentTask: {
        type: mongoose.Types.ObjectId,
        ref: 'todo'
    },
    name: String,
    status: String,
    date: {
        type: Date,
        default: Date.now()
    },
    completionDate:Date
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
