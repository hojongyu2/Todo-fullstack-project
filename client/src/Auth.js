const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const registerUser = async (username, password) => {
    const url = `${urlEndpoint}/main/signup-user`
    console.log(url)
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':urlEndpoint,
        },
        body: JSON.stringify({
            username,
            password
        }),
    });
    const responseJSON = await response.json();
    console.log(responseJSON)
    return responseJSON
}

export const loginUser = async (username, password) => {
    const url = `${urlEndpoint}/main/login-user`
    console.log(url)
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':urlEndpoint,
        },
        body: JSON.stringify({
            username,
            password
        }),
    });
    const responseJSON = await response.json();
    console.log(responseJSON.success)
    if (responseJSON.success) {
        localStorage.setItem(process.env.REACT_APP_TOKEN_HEADER_KEY, JSON.stringify(responseJSON.token));
        }return responseJSON
}

export const logoutUser = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
    return {success:true}
}
export const getUserToken = () => {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY));
}



