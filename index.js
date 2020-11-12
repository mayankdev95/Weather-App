const express = require('express');
const bodyParser = require('body-parser')
const https = require('https')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html')   

});
    app.post('/',(req,res)=>{

const quary = req.body.cityName
const apiKey = "224bde02a6c7caedaade76c74314fb4e";
const url = `https://api.openweathermap.org/data/2.5/find?q=${quary}&units=metric&appid=${apiKey}`;

https.get(url,(resp)=>{

resp.on('data',(data)=>{
const weatherData=JSON.parse(data);
const temp = weatherData.list[0].main.temp;
const weatherDetail = weatherData.list[0].weather[0].description;
const icon = weatherData.list[0].weather[0].icon;

const iconUrl= `https://openweathermap.org/img/wn/${icon}@2x.png`;

res.write("<p> The weather is currently "+ weatherDetail+"</p>")
res.write(`<h1>the temp in ${quary} is ${temp}</h1>`);
res.write("<img src="+iconUrl+">");
res.send()
  })
}) 
    })


app.listen(3005,()=>{
    console.log('**** server is running localhost 3005 *****')
})
