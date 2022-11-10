// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();


/* ---------------Middleware---------------*/
// CORS allows Cross-origin resource sharing policy letting client-side talk to the server
const cors = require("cors");

// Enable all CORS requests
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


// Initialize the main project folder
app.use(express.static("website"));

/* ---------------Setup server--------------- */
const port = 8080;
const hostname = "127.0.0.1";

// Testing the server 
function listening(){
    console.log(`Server running at http://${hostname}:${port}/`);
}

// spin up the server
app.listen(port, listening);


/* ---------------Communicating with the server--------------- */
// GET
app.get("/all", getAllData);

function getAllData(req, res){
    res.status(200).send(projectData);
}

// POST
app.post("/add", postData);

function postData(req, res){
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
  }




