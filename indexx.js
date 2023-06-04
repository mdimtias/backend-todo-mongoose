const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
// Express app initialization
const app = express();
dotenv.config();
app.use(express.json())

// Database Connection
// mongoose.connect('mongodb://localhost/todos', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=>console.log("Connection Successful"))
// .catch((err)=>console.log(err))

mongoose.connect('mongodb://localhost/todos')
  .then(() => {
    console.log('Connection Successful');
  })
  .catch((err) => {
    console.log('Connection Error:', err);
  });

// Application Routes
app.use("/todo", todoHandler)

// Default error route
function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err)
    }
    res.status(500).send({error: err})
}
app.use(errorHandler)
app.listen(5000, function(){
    console.log(`Server listening on port 5000`)
})