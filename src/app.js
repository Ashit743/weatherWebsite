const path = require('path');
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for Express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handle bar engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:'Ashit Darurmath'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Ashit Darurmath'

  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    name:'Ashit Darurmath',
    example:"Hello this is a dynamic test"
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    text:'Help article not found',
    name:'Ashit Darurmath',
    title:'404'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
    error:'Provide a address'
    })
  }

  geocode(req.query.address,(error,{latitude,longitude,location})=>{
    if(error){
      return res.send(error)
    }

    forecast({latitude,longitude},(error,data)=>{
      if (error){
        return res.send(error)
      }
      console.log(data)
      return res.send({
        location,
        temperature:data.temperature + ' degree Celcius',
        weather_descriptions: 'Currently ' + data.weather_descriptions[0]
      })
    })


  })

  // res.send({
  // Location:'Mudhol',
  // situation:'sunny'
  // })
})


app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:"Provide Search term"
    })
  }
  res.send({
    products:[]
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    text:'Page Not Foud',
    title:'404',
    name:'Ashit Darurmath'
  })
})

//app.com
app.listen(3000,()=>{
  console.log('server is up on port 3000')
})  //http based website it is port 80, for local development port 3000 is good
