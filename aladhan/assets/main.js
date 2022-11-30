
let cities = [
    {
        arabicName: "جدة",
        name :"Jiddeh"
    },
    {
        arabicName: "الرياض",
        name :"Riyadh"
    },
    {
        arabicName: "مكة المكرمة",
        name : "Makkah al Mukarramah"
    },
    {
        arabicName: "المدينة المنورة",
        name : "Al Madīnah al Munawwarah"
    },
    {
        arabicName: "أبها",
        name : "Abha"
    },
    {
        arabicName: "الدمام",
        name : "Dammam"
    },
    {
        arabicName: "جازان",
        name : "Jīzān"
    },
    {
        arabicName: "نجران",
        name : "Najrān"
    },
    {
        arabicName: "القصيم",
        name : "Al Qasim"
    },
]

for (let city of cities) {
    content = `
    <option>${city.arabicName}</option>
    `
    document.getElementById("select-cities").innerHTML += content
}

document.getElementById("select-cities").addEventListener("change", function(){
    
    for (let  city of cities) {
        let cityEnName = ""
        if(city.arabicName == this.value){
            cityEnName = city.name
            console.log(cityEnName)
            getCities(cityEnName)
            document.getElementById("city-name").innerHTML = this.value
        }
    }
    
})


 function getCities(cityName) {
    let params = {
        country : "SA",
        city : cityName,
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
        const timings = response.data.data.timings
        fillTime("fajr-time",timings.Fajr)
        fillTime("sunrise-time",timings.Sunrise)
        fillTime("dhuhr-time",timings.Dhuhr)
        fillTime("asr-time",timings.Asr)
        fillTime("magrib-time",timings.Maghrib)
        fillTime("isha-time",timings.Isha)
    
        const readable = response.data.data.date.readable
        const weekday = response.data.data.date.hijri.weekday.ar
        const date = weekday+ "  " + readable 
    
        document.getElementById("date").innerHTML = date
      })
      .catch(function (error) {
        console.log(error);
      })
    
 }

 getCities('Jiddeh')

  function fillTime(id,time) {
    document.getElementById(id).innerHTML = time
  }

  