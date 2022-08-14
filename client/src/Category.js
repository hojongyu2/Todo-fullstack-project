import { getUserToken } from "./Auth"
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const saveCategory = async (category) => {
    const url = `${urlEndpoint}/main/categories`
    const userToken = getUserToken()
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            token: userToken
        },
        body: JSON.stringify(category),
    });
    const responseJSON = await response.json();
    console.log(responseJSON)
    return responseJSON
}

export const deleteCategory = async (category) => {
    const url = `${urlEndpoint}/main/categories-delete`
    const response = await fetch(url, {
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    });
    const responseJSON = await response.json();
    console.log(responseJSON)
    return responseJSON
}