
export const getWeather = async (city) => {
    const apiKey = "c6dbb379b8df4378947cf0df76dd4b2f"
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&include=minutely`
    const apiResponse = await fetch(url);
    // console.log(apiResponse)
    const apiJson = await apiResponse.json()
    console.log(apiJson)
    return apiJson
}

export const getLocationAndTime = async () => {
    const url = `http://worldtimeapi.org/api/ip`
    const apiResponse = await fetch(url);
    console.log(apiResponse)
    const apiJson = await apiResponse.json()
    console.log(apiJson)
    return apiJson
}