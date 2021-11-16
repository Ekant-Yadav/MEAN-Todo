const express = require('express')
const Task = require('../models/tasks')
const router = express.Router()

router.get('/tasks', async(req, res, next)=>{
    const tasks = await Task.find({})
    console.log('biuc')
    res.status(200).json(tasks)
})

router.get('/tasks/:id', async(req,res,next)=>{
    const {id: taskID} = req.params
    const task = await Task.find({_id:taskID})
    res.status(200).json({task})
})

router.post('/tasks', async(req,res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
})

router.patch('/tasks/:id', async(req,res) => {
    const {id:taskID} = req.params
    
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new:true,
        runValidators:true
    })
    if(!task){
        return res.status(404).json({msg: 'no task with id'+ taskID})
    }
    res.send({task})
})

router.delete('/tasks/:id', async(req,res) => {
    const {id:taskID} = req.params
    const task  = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return res.status(404).json({msg: 'no task with id'+ taskID})
    }
    res.status(200).json(task)
})

module.exports = router