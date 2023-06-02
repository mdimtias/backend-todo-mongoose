const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

// Express app initialization
const app = express();
app.use(express.json());

// Database Connection

mongoose.connect('mongodb://127.0.0.1:27017/todos');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

// Application Routes
app.use("/todo", todoHandler);

// Default error route
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({ error: err });
}

app.use(errorHandler);

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});
