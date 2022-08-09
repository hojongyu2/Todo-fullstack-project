import { getUserToken } from "./Auth"
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const todoList = async (todo) => {
    const url = `${urlEndpoint}/main/todos`
    console.log(todo)
    const userToken = getUserToken()
    console.log(userToken)
    const todoObj = {...todo, userToken: userToken}
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoObj),
    });
    const responseJSON = await response.json();
    console.log(responseJSON)
    return {responseJSON}
}