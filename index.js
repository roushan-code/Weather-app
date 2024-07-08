// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding event listner to the form
form.addEventListener("submit",search);

// Default Locatioon
let target = "Kolkata"

// Function to fetch Data from weather API
const fetchData = async (target)=>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=b7e6aa7732664c419b8164851232905&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    

    const {
        current:{temp_c, condition:{text,icon}},
        location: {name, localtime},
    } = data;

    // Calling update DOM function 
    updateDom(temp_c, name,localtime,icon,text);
    } catch (error) {
        alert("Location not found");
    }
    
};

// Funtion to update DOM
function updateDom (temperate, city,time, emoji, text){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperateField.innerText = temperate;
    cityField.innerText = city;
    // console.log(getDayFullName(exactDay));
    dateField.innerText = `${exactTime} - ${exactDay}  ${exactDate}`
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);

// Function to search the location
function search (e){
    e.preventDefault();    // e.preventDefault for not reload the page

    target = searchField.value;
    fetchData(target);
}

// Function to get the name of day
function getDayFullName (num){
    switch(num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thrusday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't know?"
    }
}