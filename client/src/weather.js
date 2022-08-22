
export const getLocationByIp = async () => {
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
    return nameOfCity
}

const apiKey = process.env.REACT_APP_API_KEY
// console.log(apiKey)
export const getWeather = async (city) => {
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`
    const apiResponse = await fetch(url);
    // console.log(apiResponse)
    const apiJson = await apiResponse.json()
    // console.log(apiJson.data[0])
    const weatherData = apiJson.data[0]
    // console.log(weatherData.weather)
    // console.log(weatherData.app_temp)
    return weatherData
}