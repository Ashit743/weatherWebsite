console.log('Client side is loaded.')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()                                                            //disabling refresh on submit
  const location = search.value
  if(location.length==0){
    console.log('Enter a value')
    message1.textContent = 'Enter a address!'
  }
  else{
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
      response.json().then((data)=>{
        if(data.error){
          console.log(data.error)
          message1.textContent = data.error
        }
        else{
          console.log(data.location)
          message1.textContent = data.location
          message2.textContent = data.weather_descriptions
          console.log(data.weather_descriptions)
        }
      })
    })

  }
})
