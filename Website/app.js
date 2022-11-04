// Main JavaScript

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

postData('/add', {answer:42});





 
const generate = document.querySelectorAll("#generate");
const zip = document.querySelectorAll("#zip");
const feelings = document.querySelectorAll("#feelings");
const feeling = document.querySelectorAll(".feelings");
const temp = document.querySelectorAll("#temp");
const dateToday = document.querySelectorAll("dateToday");
const d = new Date();
const date = d.toDateString(); 


/* API credentials */
const baseURI = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}';
const apiKey = '2bbf9d507e0fdd30825ea6dac4d9f119&units=imperial';


/*  */
generate.addEventListener("click", (event) => {
    event.preventDefault();
    const madeURI = 'baseURI' + 'zip.value' + 'apikey';
    console.log(madeURI);
    getData(madeURI)
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

const getData = async(url) => {
    try{
        const result = await fetch(url);
        const data = await result.json();
        if(data.cod == 200){
            console.log(data);
            return data;
        }else{
            console.log(data.message);
            return data;
        }

    }catch(e){
        console.log(e);
    }
}



const cureData = async (data) => {
    try{
        if(data.message){
            return data.message;
        }else{
            const info = {
                date,
                feelings: feelings.value,
                temp: data.main.temp
            };
            console.log(info);
            return info;
        }
    } catch(err){
        console.error(err);
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
    }catch(err){
        console.error(err);
    }
};

const updateUI = async (data) => {
    const response = await data;
    console.log(response);
    if(response.date){
        document.querySelector(".outputs").style.display = "block";
        dateToday.innerHTML = response.date;
        temp.innerHTML = response.temp;
        feeling.innerHTML = response.feelings? response.feelings: "What do you feel?";
        document.querySelector("#error").style.display = "none";
    }else{
        document.querySelector(".outputs").style.display = "none";
        document.querySelector("#error").style.display = "block";
        document.querySelector('#error').innerHTML = response.message;
    }    
};

