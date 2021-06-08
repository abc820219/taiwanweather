const container = document.querySelector(".main");
const breadcrumb = document.querySelector(".breadcrumb");

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
        if(location[i].geocode == window.location.href.split("=")[1]){

            // create label element
            const labelSpan = document.createElement("span");
            // create table element
            const weather_ul = document.createElement("ul");
            const weather_li_title = document.createElement("li"); // 縣市標題
            const D_TX_Description = document.createElement("li"); // 最高溫度
            const D_TN_Description = document.createElement("li"); // 最低溫度
            const T_Description = document.createElement("li"); // 平均溫度
            const WD_Description = document.createElement("li"); // 風向
            const UVI_Description = document.createElement("li") // 紫外線指數
            const weather_Description = document.createElement("li"); // 綜合預報
            const weather_Div = document.createElement("div");

            // insert label element 
            breadcrumb.appendChild(labelSpan);
            // insert table element 
            container.appendChild(weather_ul)
            weather_ul.appendChild(weather_li_title)
            weather_ul.appendChild(D_TX_Description)
            weather_ul.appendChild(D_TN_Description)
            weather_ul.appendChild(UVI_Description)
            weather_ul.appendChild(WD_Description)
            weather_ul.appendChild(T_Description)
            weather_ul.appendChild(weather_Description)

            // adding class
            weather_ul.className = "detail-content p-3 shadow";
            weather_li_title.className = "title"

            // adding label content
            labelSpan.textContent = location[i].locationName
            // adding table content
            weather_li_title.textContent = location[i].locationName + "天氣預報";
            D_TN_Description.textContent = location[i].weatherElement[8].description + " : " + location[i].weatherElement[8].time[0].elementValue[0].value + location[0].weatherElement[8].time[0].elementValue[0].measures;
            D_TX_Description.textContent = location[i].weatherElement[12].description + " : " + location[i].weatherElement[12].time[0].elementValue[0].value + location[0].weatherElement[12].time[0].elementValue[0].measures;
            UVI_Description.textContent = location[i].weatherElement[9].description + " : "  + location[i].weatherElement[9].time[0].elementValue[0].value + "、"  + location[0].weatherElement[9].time[0].elementValue[1].value;
            WD_Description.textContent = location[i].weatherElement[13].description + " : "  + location[i].weatherElement[13].time[0].elementValue[0].value + location[0].weatherElement[13].time[0].elementValue[0].measures;
            T_Description.textContent = location[i].weatherElement[1].description + " : "  + location[i].weatherElement[1].time[0].elementValue[0].value + location[0].weatherElement[1].time[0].elementValue[0].measures;
            weather_Description.textContent = "天氣綜合描述 :";
            weather_Description.appendChild(weather_Div)
            weather_Div.textContent = location[10].weatherElement[10].description + " : "  + location[i].weatherElement[10].time[0].elementValue[0].value;
        }
    }
}
