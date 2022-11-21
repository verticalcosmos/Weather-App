// Main JavaScript

// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

/* ------------- API activation info ---------- */
const server = "http://127.0.0.1:8080"; // Server URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; // The base URL to retrieve weather data from the API, for zip codes in the US only
const apiKey = "2bbf9d507e0fdd30825ea6dac4d9f119&units=metric"; // API Key for OpenWeatherMap API


//variables
const entry = document.getElementById('holder entry');
const gen = document.getElementById("generate");
const error = document.getElementById("error");
const bodyColor = document.getElementsByTagName("body");

gen.addEventListener("click", generateData); // Function called by click

/* --------- Main function. runs the app on click ----------- */
function generateData() { 
    // user input variables
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    // functions run after successful promises
    getWeatherData(zip).then((data) => {
        if (data) {
        const {
            main: { temp },
            name: city,
            weather: [{ description }],
            weather: [{ icon }],
        } = data;

        const info = {
            newDate,
            city,
            temp: Math.round(temp), // rounding up the number
            description,
            feelings,
            icon,
        };
        console.log(info);
        postData(server + "/add", info)
        .then(() => {
        updateUI();
        });
        entry.style.opacity = 1;
        }
  });
};

//Function to GET API data
async function getWeatherData(zip){
    try {
        const res = await fetch(baseURL + zip + ',&appid=' + apiKey);
        const data = await res.json();

        // display the error message on UI
        if (data.cod != 200) { 
        error.innerHTML = data.message;
        setTimeout(_=> error.innerHTML = '', 2000)
        throw `${data.message}`;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

// Function to POST data
async function postData(url = "", info = {}){
    const res = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

//Function to GET user and API data and update UI using the data
async function updateUI(){
    const res = await fetch(server + "/all");
    try {
        const savedData = await res.json();
        let iconCode = savedData.icon;

        let bckColor = "linear-gradient(180deg, rgba(122,130,144,1) 20%, rgba(159,168,177,1) 80%)";

        if (iconCode == '01d'){
            bckColor = "linear-gradient(180deg, rgba(113,148,161,1) 20%, rgba(183,161,114,1) 80%)";
        } else if (iconCode == '02d'){
            bckColor = "linear-gradient(180deg, rgba(63,92,115,1) 20%, rgba(82,172,231,1) 80%)";
        } else if (iconCode == '03d'|| '04d'){
            bckColor = "linear-gradient(180deg, rgba(105,118,143,1) 20%, rgba(131,143,155,1) 80%)";
        } else if (iconCode == '09d' || '10d' || '11d'){
            bckColor = "linear-gradient(180deg, rgba(105,118,143,1) 20%, rgba(131,143,155,1) 80%)";
        } else if (iconCode == '13d' || '50d'){
            bckColor = "linear-gradient(180deg, rgba(122,130,144,1) 20%, rgba(158,167,176,1) 80%)";
        } else {
            bckColor = "linear-gradient(180deg, rgba(122,130,144,1) 20%, rgba(159,168,177,1) 80%)";
        }


        document.getElementById("date").innerHTML = savedData.newDate;
        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("temp").innerHTML = savedData.temp + '&degC';
        document.getElementById("wIcon").src="images/" + iconCode + ".svg";
        document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("content").innerHTML = savedData.feelings;
        bodyColor[0].style.background = bckColor;



    } catch (error) {
        console.log(error);
    }
};
