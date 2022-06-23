const request =  require('request');

const geocode = (address,callback) => {
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNobzciLCJhIjoiY2wzZnIwYmNpMHY0MjNrcDh4dDJvMGUwNyJ9.Iyyp5-8lFzy9PngbSBAa2Q&limit=1'
      //encodeURIComponent is used to be safe with characters in address such as '?' it converts it to URL compaitable string '%3F'
      request({url:url,json:true},(error,response)=>{
        if(error){
          callback('Unable to connect to location services!',undefined)
        }
        else if (response.body.features.length===0) {
          callback('Unable to find location, try another search',undefined)
        }
        else {
          callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
          })
        }
      })
}

module.exports = geocode
