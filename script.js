

let weather = {
    featchWeather: function () {
        if (arguments.length == 1) {
            url = "https://weatherdbi.herokuapp.com/data/weather/" + arguments[0]
            console.log(url)
        }
        else {
            url = "https://weatherdbi.herokuapp.com/data/weather/" + arguments[0] + "," + arguments[1];
            console.log(url)

        } fetch(url).then(res => {
            if (res.status) {
                return res.json();
            }})
            .then(data => this.displayWeather(data))
            .catch((error) =>{
                console.log(error)
                alert("Please enter correct city");
                document.querySelector('.searchBox').value='';
            })
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
        document.querySelector(".precp").innerText = "Precipitation: " + precip;
        document.querySelector(".wind").innerText = "Wind Speed: " + mile + " mile/hr";
        document.querySelector(".icon").src = iconURL;
        document.querySelector(".comment").innerText = comment;
        this.futureWeather(data)


    },
    futureWeather: function (data) {

        for (let i = 0; i < 7; i++) {
            const { day, comment, iconURL } = data.next_days[i]
            var min_c = data.next_days[i].min_temp.c
            var min_f = data.next_days[i].min_temp.f
            var max_c = data.next_days[i].max_temp.c
            var max_f = data.next_days[i].max_temp.f

            console.log(day, comment, iconURL, min_c, min_f, max_c, max_f)
            document.querySelector(".day" + i).innerText = day;
            document.querySelector(".icon" + i).src = iconURL;
            document.querySelector(".comment" + i).innerText = comment;
            document.querySelector(".min_temp" + i).innerText = "Min : " + min_c + "°C/" + min_f + "°F";
            document.querySelector(".max_temp" + i).innerText = "Max : " + max_c + "°C/" + max_f + "°F";

        }
    }
}
document.querySelector(".submit").addEventListener("click", function () {
    weather.featchWeather(document.querySelector(".searchBox").value);
})
document.querySelector(".searchBox").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.featchWeather(document.querySelector(".searchBox").value);
    }
})
weather.featchWeather("Chicago")

document.querySelector(".fa-crosshairs").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(success, error);
})


function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log('Latitude is ' + latitude + '° Longitude is ' + longitude + '°')
    var locationUrl = "https://weatherdbi.herokuapp.com/data/weather/" + latitude + "," + longitude;
    console.log(locationUrl)
    weather.featchWeather(latitude,longitude)
}

function error() {
    location.innerHTML = "Unable to retrieve your location";
}

