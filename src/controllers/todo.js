const Todo = require("../models/todo");
const mongoose = require("mongoose");
const _ = require("lodash");
const todoModel = require("../models/todo");
const { toSafeInteger } = require("lodash");

const addSub = async (_req, res, next) => {
    try {
        const { name, status, parentTask } = _req.body;
        let task = {}
        if(_req.body.status == "Completed"){
            task.name = name,
            task.status = status,
            task.parentTask = parentTask,
            task.completionDate = new Date()
        }
        else{
            task.name = name,
            task.status = status,
            task.parentTask = parentTask
        }
        const todolist = await Todo.create(task);
        return res.status(200).send({ success: true, data: todolist });
    } catch (error) {
        next(error);
    }
};

const addMainTask = async (req, res, next) => {
    try {
        const { name, status, parentTask } = req.body;
        if( parentTask != undefined ){
            Todo.findById(parentTask)
            .then(  addSub(req, res, next) )
            .catch(value=>{
                return res.status(401).send({ success: false, message: "No parent  found" });
            })
        }
        else{
            addSub(req, res, next);
        }

    } catch (error) {
        next(error);
    }
};

const getAllTask = async (_req, res, next) => {
    try {
        const todolist = await Todo.find({}, { __v: 0 }).lean();
        return res.status(200).send({ success: true, data: todolist });
    } catch (error) {
        next(error);
    }
};

const getTask = async (req, res, next) => {
    try {
        const todolist = await Todo.findById(
            mongoose.Types.ObjectId(req.params.id),
            { __v: 0 }
        ).lean();
        if (_.isEmpty(todolist)) {
            return res.status(401).send({ success: false, message: "No takss found" });
        } else {
            return res.status(200).send({ success: true, data: todolist });
        }
    } catch (error) {
        next(error);
    }
};

const editTask = async (req, res, next) => {
    try {
        const { name, status, parentTask } = req.body;
        let task = {}
        if(req.body.status == "Completed"){
            task.name = name,
            task.status = status,
            task.parentTask = parentTask,
            task.completionDate = new Date()
        }
        else{
            task.name = name,
            task.status = status,
            task.parentTask = parentTask
        }
        await Todo.updateOne({ _id: req.params.id }, task);
        return res.status(200).send({ success: true, data: "Task updated" });
    } catch (error) {
        next(error);
    }
};

const deleteParentTask = async (req, res, next) => {
    try {
          const todolist = await Todo.remove({ _id: req.params.id });
          return res.status(200).send({success: todolist ? true : false,data: todolist ? todolist : "Task not found"});
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const todolist = await Todo.find({parentTask:  mongoose.Types.ObjectId(req.params.id)}
         
        ).lean();

        if(todolist.length == 0){
            deleteParentTask(req, res, next)
        }
        else{
            let inProgressTask = todolist.filter(element => element.status == "In-Progress")
            if(inProgressTask.length>=1){

                return res.status(401).send({ success: false, message: "Can't delete Child Task Is In Progress State" });
            
            }else{
                deleteParentTask(req, res, next)
            }
        }

 
    } catch (error) {
        next(error);
    }
};

module.exports = { addMainTask, editTask, getAllTask, getTask, deleteTask  };
