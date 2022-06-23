const request = require('request');

const forecast = ({latitude,longitude,location},callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=b7718a5d8cfae765632e9e53d6acb0ae&query='+ latitude + ',' + longitude
  request({url,json:true},(error,response)=>{
    if(error){
      callback('Unable to connect',undefined)
    }
    else{
      callback(undefined,response.body.current)
    }
  })
}

module.exports = forecast
