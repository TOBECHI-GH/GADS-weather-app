
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
     .then(function() {
         console.log("service worker registered");
     })
}

const city = document.querySelector('.location .city');
const date = document.querySelector('.location .date');
const temp = document.querySelector('.current .temp');
const weather_el = document.querySelector('.current .weather');
const hilow = document.querySelector('.hi-low');
const maybe = document.querySelector('.probable');

let weatherInfo;

const api = {
    key: "4053f14bad5c6308743bfe9d063022b3",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {
     fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
       .then(weather => {
           return weather.json();
       }).then(displayResults);
}


function saveToLocalStorage(data) {
    
    if (localStorage.getItem('weatherInfo') == null) {
        weatherInfo = []
    } else {
        weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))
    }
    localStorage.setItem('weatherInfo', JSON.stringify(data));
}


(function () {
       
    if (localStorage.getItem('weatherInfo') === null) {
        return "";
    } else {
        weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'));    
        
        city.innerText = weatherInfo.cityName;
        date.innerText = weatherInfo.currentDate;
        temp.innerHTML = weatherInfo.currentTemp;
        weather_el.innerText = weatherInfo.weatherDesc;
        hilow.innerHTML = weatherInfo.hilowTemp;
        maybe.innerText = weatherInfo.eventProb;
    }
    
}());



function displayResults (weather) {
    
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    const now = new Date();
    date.innerText = dateBuilder(now);

    
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;</span>c`;

    
    weather_el.innerText = weather.weather[0].main;

    
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}<span>&deg;</span>c / ${Math.round(weather.main.temp_max)}<span>&deg;</span>c`;

    
    const test = weather.weather[0].description;
    maybe.innerText = checkWeather(test);


    const localStorageObject = {
        cityName: `${weather.name}, ${weather.sys.country}`,
        currentDate: dateBuilder(now),
        currentTemp: `${Math.round(weather.main.temp)}<span>&deg;</span>c`,
        weatherDesc: weather.weather[0].main,
        hilowTemp: `${Math.round(weather.main.temp_min)}<span>&deg;</span>c / ${Math.round(weather.main.temp_max)}<span>&deg;</span>c`,
        eventProb: checkWeather(test)
    }
    saveToLocalStorage(localStorageObject);
}





function dateBuilder (d) {
    const months = [
        "January", "Feruary", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December",
    ];
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`; 
}


function checkWeather (p) {
    if (p.includes("rain", 0)){
        return "Event will not hold";
    }

    else if (p.includes("broken", 0)){
        return "Event will hold";
    }

    else if (p.includes("storm", 0)){
        return "Event will not hold";
    }

    else if (p.includes("thunderstorm", 0)){
        return "Event will not hold";
    }

    else if (p.includes("mist", 0)){
        return "Event will not hold";
    }

    else if (p.includes("snow", 0)){
        return "Event will not hold";
    }

    else if (p.includes("heavy", 0)){
        return "Event will not hold";
    }

    else if (p.includes("clouds", 0)){
        return "Event will hold";
    }

    else if (p.includes("sunny", 0)){
        return "Event will hold";
    }

    else if (p.includes("clear", 0)){
        return "Event will hold";
    }

    else {
        return "Contact event co-ordinator";
    }

    
}



