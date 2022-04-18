const express = require('express')
const router = express.Router()
const Todos = require('../models/todos.js')

//index
router.get('/', (req, res)=>{
    Todos.find({}, (err, foundTodos) =>{
        res.json(foundTodos)
    })
})

//delete
router.delete('/:id', (req, res)=>{
    Todos.findByIdAndRemove(req.params.id, (err, deletedTodos)=>{
        res.json(deletedTodos)
    })
})

//update
router.put('/:id', (req, res)=>{
    Todos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodos)=>{
        res.json(updatedTodos)
    })
})

//create
router.post('/', (req, res) => {
    Todos.create(req.body, (err, createdTodo) => {
        res.json(createdTodo)
    })
})

//show
router.get('/:id', (req, res)=>{
    Todos.findById(req.params.id, (err, foundTodo)=>{
        res.json(foundTodo)
    })
})

module.exports = router