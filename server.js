const express = require("express");
const request = require("request")
const https = require("https");
const bodypase=require("body-parser")
const app = express();
app.use(bodypase.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
  
app.post("/",(req,res)=>{
    
    const query = req.body.cityName
    const apikey = 'e581f50db411f88eddb6cca857d0e7b0'
    const url='https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+apikey+'&units=metric'
    https.get(url,(resp)=>{
        // console.log(resp.statusCode)
        resp.on("data",(data)=>{
            // console.log(data)
            const weatherData = JSON.parse(data);
            // console.log(weatherCall)
            const temp = weatherData.main.temp;
            const pri=temp
            const  discription = weatherData.weather[0].description
            console.log(temp,discription)
            // res.send(pri)
            // res.status(200).send((" <h1> The temperature in Ghazipur is  " +temp  + "   degree celcius </h1>").toString());
            res.write((" <p> The  in "+ query+" is  " +temp  + "   degree celcius </p>"))
            res.write("<p> The weather discription is "+ discription+"</p>")

        })

    })

})

app.listen(3000,()=>{
    console.log("server is running")
})

