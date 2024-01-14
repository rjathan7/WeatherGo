document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "dbae7ad94fecd2a228d3a24a58ec31e5";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    // Select weather icons
    const cloudIcon = document.querySelector(".fa-solid.fa-cloud");
    const sunIcon = document.querySelector(".fa-solid.fa-sun");
    const snowflakeIcon = document.querySelector(".fa-regular.fa-snowflake");
    const waterIcon = document.querySelector(".fa-solid.fa-water");
    const rainIcon = document.querySelector(".fa-solid.fa-cloud-showers-heavy");
    const drizzleIcon = document.querySelector(".fa-solid.fa-cloud-rain");

    // Hide all Font Awesome icons initially
    hideAllIcons();

    function hideAllIcons() {
        cloudIcon.style.display = "none";
        sunIcon.style.display = "none";
        snowflakeIcon.style.display = "none";
        waterIcon.style.display = "none";
        rainIcon.style.display = "none";
        drizzleIcon.style.display = "none"
    }
    cloudIcon.style.display = "block"; // default

    // Select the search bar and get its input
    const searchBar = document.querySelector("#search-bar");

    // Select search button
    const searchBtn = document.querySelector(".search-button");

    // Shows error with animation
    function showError() {
        document.querySelector("#error-container").style.display = "block";
        document.querySelector("#error-message").style.transform = "translateY(0)";
    }

    // Function to hide the error message with animation
    function hideError() {
        document.querySelector("#error-message").style.transform = "translateY(100%)";
        setTimeout(function() {
            document.querySelector("#error-container").style.display = "none";
        }, 500); // Delay of transition duration
    }

    async function checkWeather(location) {
        // Make an asynchronous fetch request to the OpenWeatherMap API
        const response = await fetch(apiUrl + location + `&appid=${apiKey}`); 

        if (response.status == 404) {
            showError();
        } else {
            // If the response is successful, parse the JSON data from the response
            var data = await response.json();

            document.querySelector("#location").innerHTML = data.name;
            document.querySelector("#degree").innerHTML = Math.ceil(data.main.temp) + "°C";
            document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
            document.querySelector("#windspeed").innerHTML = data.wind.speed + " km/h";
            document.querySelector("#pressure").innerHTML = data.main.pressure + " hPa";
            document.querySelector("#feels-like").innerHTML = Math.ceil(data.main.feels_like) + "°C";
            document.querySelector("#weather-desc").innerHTML = data.weather[0].main;

            // Set the weather icon based on conditions
            hideAllIcons();
            if (data.weather[0].main == "Clouds") {
                cloudIcon.style.display = "block";
            } else if (data.weather[0].main == "Clear") {
                sunIcon.style.display = "block";
            } else if (data.weather[0].main == "Rain") {
                rainIcon.style.display = "block";
            } else if (data.weather[0].main == "Drizzle") {
                drizzleIcon.style.display = "block";
            } else if (data.weather[0].main == "Mist") {
                waterIcon.style.display = "block";
            }

            hideError();
        }
    }

    // Add event listener to the form's submit event
    document.querySelector("#search").addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault(); 
        userInput = searchBar.value;
        checkWeather(userInput);
    });
});


