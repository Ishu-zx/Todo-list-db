const express = require('express')
const router = express.Router()
const Tasks = require('../models/todo.model')

let editvalueId ='',msg = ''
// geting all tasks from the list
router.get('/',async(req,res)=>{
    try {
        let tasks = await Tasks.find()
        let temp=null
        for(let i = 0;i<=tasks.length;i++){
            for(let j=i+1;j<=tasks.length-1;j++){
                if(tasks[i].priority>=tasks[j].priority){
                    temp = tasks[i]
                    tasks[i]=tasks[j]
                    tasks[j]=temp
                }
            }
        }
        if(editvalueId!=''){
            const editTask = await Tasks.findById(editvalueId)
            return res.status(200).render('list',{tasks,editTask:editTask.task,msg})
            msg=''
        }
        res.status(200).render('list',{tasks,editTask:null,msg})
        msg=''
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

// add task
router.post('/',async(req,res)=>{
    const priority = Number(req.body.priority)
    if(editvalueId==''){
        await Tasks.insertOne({task:req.body.task,priority}) 
    }else{
        console.log("update!!")
        await Tasks.updateOne({_id:editvalueId},{task:req.body.task,priority})
        msg = 'Updated Successfully'
        editvalueId = ''
    }
    res.redirect('/')
})

// edit task
router.get('/edit/:id',async(req,res)=>{
    editvalueId = req.params.id
    res.redirect('/')
})
//delete tasks
router.get('/delete/:id',async(req,res)=>{  
    await Tasks.deleteOne({_id:req.params.id})
    editvalueId=''
    msg = 'Deleted Successfully'
    res.redirect('/')
})

module.exports = router