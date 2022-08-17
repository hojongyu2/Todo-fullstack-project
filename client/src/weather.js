
export const getWeather = async (city) => {
    const apiKey = "c6dbb379b8df4378947cf0df76dd4b2f"
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&include=minutely`
    const apiResponse = await fetch(url);
    // console.log(apiResponse)
    const apiJson = await apiResponse.json()
    console.log(apiJson.data[0])
    const weatherData = apiJson.data[0]
    // console.log(weatherData.weather)
    // console.log(weatherData.app_temp)
    return {weather:weatherData.weather, temp:weatherData.app_temp, datetime:weatherData.datetime}
}

export const getLocationAndTime = async () => {
    const url = `http://worldtimeapi.org/api/ip`
    const apiResponse = await fetch(url);
    // console.log(apiResponse)
    const apiJson = await apiResponse.json()
    console.log(apiJson)
    const timezone = apiJson.timezone
    // const slash = "/"
    // let indexOfSlash = timezone.indexOf(slash)
    // console.log(indexOfSlash)
    // console.log(timezone.slice(8))
    const nameOfCity = timezone.slice(8)
    return {city:nameOfCity}
}