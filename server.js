// Setup empty JS object to act as endpoint for all routes
projectData = {

};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('Website'));


// Setup Server

const port = 8000;

/* Spin up the server*/
const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log('Running on port:' + port);
}

app.get('/', function (req, res) {
    res.send('hello world');
  });

  app.post("/add", async function(req, res) {
    const body = await req.body;
    projectData = body;
    console.log(projectData);
    res.status(200).send(projectData);
});

app.get("/all", async (req, res) => {
    res.send(projectData);
});














/*let projectData = {};

const express = require('express');

const app = express();

const port = 8000;

//parse the json files from the client side //
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("Website"));

const cors = require('cors');

app.use(cors());

app.post("/add", async function(req, res) {
    const body = await req.body;
    projectData = body;
    console.log(projectData);
    res.status(200).send(projectData);
});

app.get("/all", async (req, res) => {
    res.send(projectData);
});

app.listen(port, function(){
    console.log('listening on port' + port);
});

*/