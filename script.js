// Input Data
const cityName = document.querySelector('input');
const submitButton = document.querySelector('button');
// Output Data Container In HTML Page
const outputData = document.getElementById('data-output-container');
const city = document.getElementById('city');

// Data Related To Weather
const temperature = document.getElementById("temperature");
const condition = document.getElementById('condition');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');

// Function To Get Weather Data
async function getweatherData(cityName){
  
    let data1 = undefined;
    console.log("fetch start");

    // Getting Weather Data
  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=0c6724db68618f6efec98ef8aa616ad7&units=metric`)
    .then((response)=>{
        // If Any Error Occurred After Fetching
        if(!response.ok){
            console.log(response);
            return(false);
        }
       else
       {
        // If No Error Occurred
        return response.json();
       }
       
        
    }).then((data)=>{
        // assigning received data object to local variable   
        data1 = data;
    })
    .catch((error)=>{
        // For Network Related Error
        alert("PLEASE CHECK YOUR NETWORK");
    })

    // It holds object that received By API Response
    return data1;
}


// Weather Data Will be achieved after clicking on Submit Button
submitButton.addEventListener("click",()=>{
console.log("Clicked");

// Will Hit API and received Data Object
getweatherData(cityName.value).then((data)=>{
   console.log(cityName.value);
    if(data){

        console.log(data);

        // Enabling Visibility Of Output Data Container On HTML
        outputData.classList.add('flex');
        outputData.classList.remove('hidden');

        // Assigning Values To HTML Elements Which is Returned API
        city.textContent = `${data['name']}`

        temperature.textContent = `${Math.ceil(data['main']['temp'])}`;

        condition.textContent = `${data['weather'][0]['description']}`.toUpperCase();

        windSpeed.textContent = `${(data.wind['speed']*3.6).toPrecision(3)}`;
        
        humidity.textContent = `${data['main']['humidity']}`;

        visibility.textContent = `${data['visibility']/1000}`

    }
    else{
        // If Wrong City Name Is Entered
        alert("City Not Exist In API Serive Provider");
    }
  
}).catch((error)=>{
    // Handling if Any Error Or Exception Occurs
    alert("Something went wrong");
    console.log("Something went wrong");
})

});
