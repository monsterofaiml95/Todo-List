const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const signupRoute = require('./routes/signup.js');
const loginRoute = require('./routes/login.js')
const todoRoute = require("./routes/todos.js");
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = express();
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Failed to connect to Database", err);
  });



app.use(cors({
    origin: 'https://todo-list-4t2509945-ishaan-sahus-projects.vercel.app/', // your React app origin
    credentials: true
}));

app.get("/",(req,res)=>{
    res.send("OK");
});

app.use("/signup",signupRoute);
app.use("/login",loginRoute);
app.use("/todos",todoRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server running at port: ${process.env.PORT}`);
});