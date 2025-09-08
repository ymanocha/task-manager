 const Task = require('../models/task')
 
 
 const getAlltasks = (req,res)=>{
    res.send('all items')
 }

 const createTask = async (req,res)=>{
   const task = await Task.create(req.body) 
   res.status(201).json({task})
 }

 const getTask = (req,res)=>{
    res.json({id:req.params.id})
 }
 const updateTask = (req,res)=>{
    res.send('update task')
 }
 const deleteTask = (req,res)=>{
    res.send('delete task')
 }


 module.exports = {
    getAlltasks, 
    createTask,
    getTask,
    updateTask,
    deleteTask
 }