
import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import LoginPage from './Pages/Loginpage';
import TodoPage from './Pages/TodoPage';
import SignupPage from './Pages/SignupPage';



function App() {

  const [isAuthLoading, setIsAuthLoading] = useState('');
  const [showUsername, setShowUsername] = useState('')//show username when logged in
  const [town, setTown] = useState('')
  const [temp, setTemp] = useState()

  const getWeather = async (city) => {
    const apiKey = "c6dbb379b8df4378947cf0df76dd4b2f"
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&include=minutely`
    const apiResponse = await fetch(url);
    // console.log(apiResponse)
    const apiJson = await apiResponse.json()
    // console.log(apiJson.data[0])
    const weatherData = apiJson.data[0]
    // console.log(weatherData.weather)
    // console.log(weatherData.app_temp)
    setTemp({ weather: weatherData.weather, temp: weatherData.app_temp, datetime: weatherData.datetime })
    return { weather: weatherData.weather, temp: weatherData.app_temp, datetime: weatherData.datetime }
  }

  const getLocationAndTime = async () => {
    const url = `http://worldtimeapi.org/api/ip`
    const apiResponse = await fetch(url);
    // console.log(apiResponse)
    const apiJson = await apiResponse.json()
    // console.log(apiJson)
    const timezone = apiJson.timezone
    // const slash = "/"
    // let indexOfSlash = timezone.indexOf(slash)
    // console.log(indexOfSlash)
    // console.log(timezone.slice(8))
    const nameOfCity = timezone.slice(8)
    // console.log(nameOfCity)
    setTown(nameOfCity)
    return {sucess:true}
  }
  // getLocationAndTime()
  
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage isAuthLoading={isAuthLoading}
            setIsAuthLoading={setIsAuthLoading} showUsername={showUsername} setShowUsername={setShowUsername} />} />
          <Route path="/sign-up" element={<SignupPage isAuthLoading={isAuthLoading}
            setIsAuthLoading={setIsAuthLoading} />} />
          <Route path="/todo" element={<TodoPage isAuthLoading={isAuthLoading}
            setIsAuthLoading={setIsAuthLoading} showUsername={showUsername} setShowUsername={setShowUsername} 
            town={town} temp={temp }/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
