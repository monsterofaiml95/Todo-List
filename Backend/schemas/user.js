const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required:true,
        trim: true
    },
    age: {
        type: Number,
        required:true,
        trim: true
    },
    gender: {
        type: String,
        required:true,
        trim: true
    },
    address:String,
    password:   {
        type: String,
        required:true,
        trim: true
    },
    todos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todo'
    }]
});

const User = new mongoose.model('user',userSchema);
module.exports = User;