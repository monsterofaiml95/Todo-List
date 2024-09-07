const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Todo = require('../schemas/todo.js')
const User = require('../schemas/user.js')

router.use(bodyParser.urlencoded({extended:true}));

router.get("/",async (req,res)=>{
    const user = await User.findOne({username:req.query.username}).populate('todos').exec();
    const todos = user.todos;
    // console.log(todos);
    
    res.status(200).json({
        todos
    })
    }
);

router.post("/",async (req,res)=>{
    let todo = new Todo({
        title: req.body["todo-title"],
        description: req.body["todo-description"],
        completed: false
    });
    try {
        todo = await todo.save()
        await User.updateOne({
            username:req.query.username
        },{
            $push: {todos: todo._id}
        });
        console.log("Todo Saved Successfully");
        res.status(200).json(todo);
    } catch (error) {
        console.log("Error ",error);
    }
});

router.delete("/",async (req,res)=>{
    const username = req.query.username;
    const id = req.query.id;
    console.log(username);
    console.log(id);
    try{
    const user = await User.updateOne({username:username},{$pull: {todos:id}});
    await Todo.deleteOne({_id:id})
    .then(()=>{
        console.log("Todo Deleted");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.sendStatus(200);
    }
    catch{()=>
        res.sendStatus(404);
    }
});

router.put("/",async (req,res)=>{
    const id = req.query.id;
    // console.log(id);
    const todo = await Todo.findOne({_id:id})
    await Todo.updateOne(
        { _id: id },
        { $set: { completed: !todo.completed } } // Toggle in one step
      )
    .then(()=>{
        console.log("Todo Updated");
        res.status(200).json({
            msg:"Todo Updated"
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).json({err})
    });
});

router.get("/todo",async(req,res)=>{
    const id = req.query.id;
    const todo = await Todo.findOne({_id:id});
    // console.log(todo);
    res.status(200).json(todo);
});

router.put("/todo",async (req,res)=>{
    const id = req.query.id;
    await Todo.updateOne({_id:id},{
        $set: {title: req.body.title, description:req.body.description}
    })
    .then(()=>{
        res.status(200).json({
            msg: "Todo Edited Successfully"
        })
    })
    .catch((err)=>{
        res.status(403).json({
            err
        })
    })
});

module.exports = router;