
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

        const result = JSON.stringify(data)
        for (let i = 1; i < 7; i++) {
            const { day, comment, iconURL } = data.next_days[i]
            var min_c = data.next_days[i].min_temp.c
            var min_f = data.next_days[i].min_temp.f
            var max_c = data.next_days[i].max_temp.c
            var max_f = data.next_days[i].max_temp.f

            console.log(day, comment, iconURL,min_c,min_f,max_c,max_f)
            document.querySelector(".day" + i).innerText = day;
            document.querySelector(".icon" + i).src = iconURL;
            document.querySelector(".comment" + i).innerText = comment;
            document.querySelector(".min_temp" + i).innerText = "Min : " + min_c + "°C/" + min_f + "°F";
            document.querySelector(".max_temp" + i).innerText = "Max : " + max_c + "°C/" + max_f + "°F";

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
