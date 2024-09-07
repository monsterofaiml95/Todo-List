const express = require('express');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        requied:true
    },
    description: {
        type:String,
        requied: true
    },
    completed: {
        type: Boolean
    }
})

const Todo = new mongoose.model('todo',todoSchema);

module.exports = Todo;