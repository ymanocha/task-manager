 const Task = require('../models/task')
 const asyncWrapper = require('../middleware/async')
 const{createCustomError} = require('../errors/custom-error')
 
//old way:
//gonna refactor all of the code so that we dont have to use try and catch everytime.
//  const getAlltasks = async (req,res)=>{
//    try {
//       const tasks = await Task.find({})
//       res.status(200).json({tasks})
//       // res.status(200).json({ tasks, amount: tasks.length })
//       // res.status(200).json({ status:'success', data:tasks, nbHits: tasks.length})
//    } catch (error) {
//       res.status(500).json({msg: error})
//    }
//  }

 const getAlltasks = asyncWrapper(async (req,res)=>{
      const tasks = await Task.find({})
      res.status(200).json({tasks})
      // res.status(200).json({ tasks, amount: tasks.length })
      // res.status(200).json({ status:'success', data:tasks, nbHits: tasks.length})
   })




 const createTask = asyncWrapper( async (req,res)=>{

      const task = await Task.create(req.body) 
      res.status(201).json({task})
 
 })

 const  getTask = asyncWrapper( async (req,res,next)=>{
 
      const {id:TaskID} = req.params
      const task = await Task.findOne({_id: TaskID});
      if(!task){

         return next(createCustomError(`No task with id: ${TaskID}`,404))
         //gotta understand the below one
         // const error = new Error('Not Found')
         // error.status = 404
         // return next(error)

         //old method
         // return res.status(404).json({msg: `no task with id : ${TaskID}`})
      }
      res.status(200).json({task})
  
 })
 

 const deleteTask = asyncWrapper( async (req,res)=>{

      const {id: TaskID} = req.params;
      const task = await Task.findOneAndDelete({_id: TaskID});
       if(!task){
          return next(createCustomError(`No task with id: ${TaskID}`,404))
      }
     res.status(200).json({task})
     // res.status(200).send()
     //  res.status(200).json({task:null, status:'success'})
     // } catch (error) {
     //    res.status(500).json({msg: error}) //cast error
     // } 
 })

const updateTask = asyncWrapper( async (req,res)=>{
 
      const {id: TaskID} = req.params;
      const task = await Task.findOneAndUpdate({_id:TaskID},req.body,{
         new: true,
         runValidators:true
      })
       if(!task){
          return next(createCustomError(`No task with id: ${TaskID}`,404))
      }
      res.status(200).json({task})
  
 })

 module.exports = {
    getAlltasks, 
    createTask,
    getTask,
    updateTask,
    deleteTask
 }