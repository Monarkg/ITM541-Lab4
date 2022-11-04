
let weather = {
    featchWeather: function (city) {
        fetch(
            "https://weatherdbi.herokuapp.com/data/weather/" + city)
            .then(res => res.json())
            .then(data => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { region } = data;
        const { dayhour, precip, humidity, iconURL, comment } = data.currentConditions
        const { c, f } = data.currentConditions.temp
        const { km, mile } = data.currentConditions.wind
        console.log(region, c, f, dayhour, precip, humidity, iconURL, comment, km, mile)
        document.querySelector(".city").innerText = "Weather in " + region;
        document.querySelector(".dayhour").innerText = dayhour;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".temp").innerText = c + "°C/" + f + "°F";
        document.querySelector(".precp").innerText = "Precp: " + precip;
        document.querySelector(".wind").innerText = "Wind Speed: " + mile + " mile/hr";
        document.querySelector(".icon").src = iconURL;
        document.querySelector(".comment").innerText = comment;
        this.futureWeather(data)


    },
    searchLocation: function () {
        this.featchWeather(document.querySelector(".searchBox").value)
    },
    futureWeather: function (data) {
        for (let i = 1; i < 7; i++) {
            const { day, comment, iconURL } = data.next_days[i]
            const { c, f } = data.next_days[i].min_temp
            console.log(day, comment, iconURL)
            document.querySelector(".day"+i).innerText = day;
            document.querySelector(".icon"+i).src = iconURL;
            document.querySelector(".comment"+i).innerText = comment;
            document.querySelector(".min_temp"+i).innerText = "Min Temp: " + c + "°C/" + f + "°F";
        }
    }
}
document.querySelector(".search button").addEventListener("click", function () {
    weather.searchLocation();
})
document.querySelector(".searchBox").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.searchLocation();
    }
})
weather.featchWeather("Chicago")