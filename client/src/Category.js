const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const CategoryList = async (category) => {
    const url = `${urlEndpoint}/main/categories`
    console.log(url)
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    });
    const responseJSON = await response.json();
    console.log(responseJSON)
    return {responseJSON}
}