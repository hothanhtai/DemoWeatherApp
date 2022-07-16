const search = document.querySelector('.search')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const value1 = document.querySelector('.value')
const shortDec = document.querySelector('.short-dec')
const visibility = document.querySelector('.visibility span')
const wind = document.querySelector('.wind span')
const sun = document.querySelector('.sun span')
const icon = document.querySelector('.icon')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const content = document.querySelector('.content')
const body = document.querySelector('body')

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Firday","Saturday"]
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


async function changeWeatherUI(){
    let searchValue = search.value.trim()
    let API_URL = `http://api.weatherapi.com/v1/current.json?key=df15edd8be1948429c643013221407&q=${searchValue}&aqi=yes`
    let res = await fetch(API_URL)
    let data = await res.json()
    console.log(data)
    shortDec.innerText = data.current.condition.text
    city.innerText = data.location.name
    country.innerText = data.location.country
    icon.innerHTML = `<img src="${data.current.condition.icon}" alt="">`
    sun.innerText = `${data.current.humidity}%`
    visibility.innerText = `${data.current.vis_km} km`
    wind.innerText = `${data.current.wind_kph} km/h`
    value1.innerHTML = `<span class="value">${Math.ceil(data.current.temp_c)}<sup>o</sup>C</span>`
    if(Math.ceil(data.current.temp_c)<14){
        body.setAttribute('class','cold')
    }else if(Math.ceil(data.current.temp_c)<20){
        body.setAttribute('class','cool')
    }else if(Math.ceil(data.current.temp_c)<30){
        body.setAttribute('class','warm')
    }else {
        body.setAttribute('class','hot')

    }
}
function setTime(){
    const time = new Date()
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hour = time.getHours()
    const hoursForClock = hour % 12
    const minute = time.getMinutes()
    const second = time.getSeconds()
    const ampm = hour > 12? 'PM':'AM'

    dateEl.innerHTML = `${days[day]},${months[month]} ${date}`
    timeEl.innerHTML = `${hoursForClock}:${minute < 10 ? `0${minute}` : minute}:${second <10?`0${second}`:second} ${ampm}`
   

}

setInterval(setTime,1000)
content.classList.add('hide')
search.addEventListener('keypress',(e)=>{
    if(e.code === 'Enter'){
        changeWeatherUI()
        content.classList.remove('hide')
    }
})
