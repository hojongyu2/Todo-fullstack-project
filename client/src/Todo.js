import { getUserToken } from "./Auth"
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const saveTodo = async (todo, categoryIdList) => {
    const url = `${urlEndpoint}/main/todos`
    console.log(todo)
    const userToken = getUserToken()
    console.log(userToken)
    const bodyObj = {...todo, categoryIdList}
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            token: userToken
        },
        body: JSON.stringify(bodyObj),
    });
    const responseJSON = await response.json();
    console.log(responseJSON)
    return {responseJSON}
}