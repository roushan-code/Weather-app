const search = document.querySelector(".main .b1 input");

const btn = document.querySelector(".main .b1 button");
const bigImg = document.querySelector(".main .b2 img");
const temp = document.querySelector(".main .b2 h1");
const inputText = document.querySelector(".main .b2 p");
// const hImg = document.querySelector(".h img");
// const wImg = document.querySelector(".w img");
const hper = document.querySelector(".hp");
const wk = document.querySelector(".wk");


let target = "Kolkata";
btn.addEventListener("click", searchInput);
search.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      searchInput();
      search.value = "";
    }
  });

function searchInput(e){
        // e.preventDefault();
        target = search.value;
        console.log(target);
        fetchData(target);
        search.value = "";
    }
    // console.log(target);

const fetchData = async(target)=>{
    try {
        // console.log(target);
        const url = `https://api.weatherapi.com/v1/current.json?key=b7e6aa7732664c419b8164851232905&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
     const {
        current: {humidity, temp_c, wind_kph, condition: {icon}},
     location: { name} } = data;

     updateDom(humidity, temp_c, wind_kph, icon,  name);
    } catch (error) {
        alert("Location not found");
    }
}

fetchData(target);

function updateDom(humidity, temp_c, wind_kph, icon,  city){
    bigImg.src = icon;
    temp.innerText = temp_c + "°c";
    inputText.innerText = city;
    hper.innerText = humidity + "%";
    wk.innerText = wind_kph + "km/h";
}