// Main JavaScript

/* API credentials */
const apiKey = '2bbf9d507e0fdd30825ea6dac4d9f119&units=imperial';
const URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Full URL sample 'https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}';


/* Global variables */

const generate = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const feeling = document.querySelector("#content");
const temp = document.querySelector("#temp");
const dateToday = document.querySelector("#dateToday");
let d = new Date();
let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); 



/* connect to the API endpoint on click  */
generate.addEventListener("click", (event) => {
    event.preventDefault();
    const madeURL = URL + zip.value + '&appid=' + apiKey;
    console.log(madeURL);
    getData(madeURL)
    .then((data) =>{
        cureData(data)
        .then((info) => {
            postData("/add", info)
            .then((data) => {
                retreiveData("/all")
                .then((data) => {
                    updateUI(data);
                })
            });
        });
    });
});  


/* request data from the API endpoint function  */
const getData = async(url) => {
    try{
        const result = await fetch(url);
        const data = await result.json();
        if(data.code == 200){
            console.log(data);
            return data;
        }else{
            console.log(data.message);
            return data;
        }

    }catch(error){
        console.log(error);
    }
};



const cureData = async (data) => {
    try{
        if(data.message){
            return data.message;
        }else{
            const info = {
                date,
                content: feelings.value,
                temp: data.main.temp
            };
            console.log(info);
            return info;
        }
    } catch(error){
        console.error(error);
    }
        
};

const postData = async(url="", data={}) => {
    try {
        const result = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return result;
    }catch(err){
        console.error(err);
    }
};

const retreiveData = async(url) => {
    const data = await fetch(url);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    }catch(error){
        console.error(error);
    }
};

const updateUI = async (data) => {
    const response = await data;
    console.log(response);
    if(response.date){
        document.querySelector(".outputs").style.display = "block";
        dateToday.innerHTML = response.date;
        temp.innerHTML = response.temp;
        content.innerHTML = response.feelings? response.feelings: "What do you feel?";
        document.querySelector("#error").style.display = "none";
    }else{
        document.querySelector(".outputs").style.display = "none";
        document.querySelector("#error").style.display = "block";
        document.querySelector('#error').innerHTML = response.message;
    }    
};

