const weatherDiv = document.querySelector(".flex-wrap");

const url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-98B7D5D8-18FE-4C71-B9C5-57A4FEB00A81"
fetch(url)
.then( async (response)=>{
    return await response.json()
})
.then((result)=>{
    record = result.records
    loadingData(record)
})

function loadingData(record){
    let location = record.locations[0].location
    for(let i=0; i<location.length; i++){

        // create element 
        const weather_a = document.createElement("a");
        const weather_ul = document.createElement("ul");
        const weather_city = document.createElement("li"); 
        const weather_li_one = document.createElement("li");
        const weather_li_two = document.createElement("li");
        const weather_Div = document.createElement("div");
        
        // insert element
        weatherDiv.appendChild(weather_a);
        weather_a.appendChild(weather_ul);
        weather_ul.appendChild(weather_city);
        weather_ul.appendChild(weather_li_one);
        weather_ul.appendChild(weather_li_two);

        // adding class
        weather_ul.className = "p-3 cursor-pointer shadow";
        weather_city.className = "weather-card-title";
        weather_a.setAttribute("href", `./detail.html?key=${location[i].geocode}`);
        weather_a.classList.add("weather-card");
        
        // adding content
        weather_city.textContent = location[i].locationName + "2021-06-11";
        weather_li_one.textContent = "時間 : 早上六點~下午六點"
        weather_li_two.textContent = "天氣預報綜合描述  :" 
        weather_li_two.appendChild(weather_Div);
        weather_Div.textContent =location[i].weatherElement[10].time[0].elementValue[0].value
    }
}
