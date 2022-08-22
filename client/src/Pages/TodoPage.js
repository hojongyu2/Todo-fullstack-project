import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth"
import { saveTodo } from "../Todo";//post request
import { saveCategory } from "../Category"; //post request
import { deleteTodo } from "../Todo";//delete request
import { deleteCategory, getUserCategories } from "../Category";//delete request
import { getWeather } from "../weather";
import { getLocationByIp } from "../weather";



const TodoPage = ({ isAuthLoading, setIsAuthLoading, showUsername, setShowUsername }) => {
    const [userToken, setUserToken] = useState("");
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('')
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCatetoryInput] = useState('')
    const [optionValue, setOptionValue] = useState("")
    const [isCategoryDataLoading, setIsCategoryDataLoading] = useState(false);
    const navigate = useNavigate();

    //weather state variables
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState('')
    const [isLocationDataLoading, setIsLocationDataLoading] = useState(false);
    const [weatherDescription, setWeatherDescription] = useState('')
    const [dateTime, setDateTime] = useState([new Date().toDateString()])

    const greeting = () => {
        const d = new Date().getHours();
        // console.log(d)
        if (d >= 0 && d <= 12) return "Good Morning,  ";
        if (d > 12 && d <= 18) return "Good Afternoon,  ";
        if (d > 18 && d <= 24) return "Good Evening,  ";
    }

    const toFahrenheit = (c) => {
        return (c * 1.8) + 32
    }

    function removeNull(array) {
        return array.filter(x => x !== null)
    };

    useEffect(() => {
        const fetchUserToDoData = async () => {
            const userDataResponse = await getUserCategories()
            // console.log("userDataResponse ", userDataResponse)
            const userCategories = userDataResponse.userData.categoryList
            // console.log("userCategories ", userCategories)
            setCategories(userCategories)

            setShowUsername(userDataResponse.userData.username)

            const userCategoriesTodoList = userCategories.map((x) => {
                return x.toDoList
            })
            const userCategoriesTodos = userCategoriesTodoList.flat()
            console.log(userCategoriesTodos)

            if (userCategoriesTodos.includes(null)) {
                removeNull(userCategoriesTodos.includes(null))
            }// remove null value after delete function

            setTodos(userCategoriesTodos)

        }
        fetchUserToDoData()
    }, [isCategoryDataLoading])

    useEffect(() => {
        const localUserToken = getUserToken();
        setUserToken(localUserToken);
    }, [isAuthLoading]);

    useEffect(() => {
        const fetchLocationData = async () => {
            const locationData = await getLocationByIp()
            setCity(locationData)
        }
        fetchLocationData()
    }, [isLocationDataLoading]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const weatherData = await getWeather(city)
            // console.log(weatherData)
            setWeather(weatherData)
            setWeatherDescription(weatherData.weather.description)
            setDateTime([new Date().toDateString()])
        }
        fetchWeatherData()

    }, [city])

    const categoriesName = categories.map((x) => {
        const editOption =

            { value: x.name, name: x.name, id: x.categoryId }

        return editOption
    })

    const handleClickStrikeThrough = (event) => {
        if (event.target.style.textDecoration) {
            event.target.style.removeProperty('text-decoration');
        } else {
            event.target.style.setProperty('text-decoration', 'line-through');
        }
    }// onclick strikethrough. backend hasn't been updated.

    return (

        <form className="d-flex flex-row justify-content-between" >
            <div className="d-flex  flex-column justify-content-start" style={{ backgroundColor: "white", borderRadius: "30px", margin: "50px", padding: "20px", width: "30vw", height: "90vh" }}>
                {categories.map((category, index) => (
                    <div className="d-flex bd-highlight mb-3" key={index}  >
                        <span className="me-auto p-2 bd-highlight"  >{category.name}</span>
                        <span className="p-2 bd-highlight" style={{ backgroundColor: "lightgrey", borderRadius: "50px", margin: "3px" }}>{category.toDoIdList.length}</span>
                        <button type="button" class="btn btn-outline-primary" style={{margin:"3px"}} onClick={async () => {
                            setIsCategoryDataLoading(true)
                            await deleteCategory([category])//send delete request
                            setIsCategoryDataLoading(false)
                        }}>Delete</button>
                    </div>
                ))}

                <input className="text-center" style={{ border: "none", backgroundColor: "lightgrey", borderRadius: "10px", margin: "5px" }} type="text" value={categoryInput} onChange={(e) => {
                    const value = e.target.value
                    setCatetoryInput(value)
                }} placeholder="create categories"></input>

                <button type="button" className="btn btn-outline-primary" style={{ margin: "5px" }} onClick={async () => {
                    if (!categoryInput) {
                        return
                    }
                    const newCategory = { categoryName: categoryInput, checked: false }
                    setIsCategoryDataLoading(true)
                    await saveCategory(newCategory)
                    setIsCategoryDataLoading(false)
                    setCatetoryInput('')
                }}>+</button>
                {userToken &&
                    <>
                        <button style={{ margin: "5px" }} type="button" className="btn btn-outline-primary"
                            onClick={async () => {
                                console.log(localStorage)
                                setIsAuthLoading(true)
                                // console.log("isAuthLoading :" + isAuthLoading)
                                const logoutSuccess = await logoutUser();
                                console.log(localStorage)
                                if (logoutSuccess.success) {
                                    // console.log("isAuthLoading :" + isAuthLoading)
                                    setIsAuthLoading(false)
                                    setShowUsername('')
                                    navigate('/')
                                }
                            }}
                        >
                            Logout
                        </button>
                    </>}
            </div>

            <div className="d-flex flex-column justify-content-start" style={{ height: "100vh", marginRight: "200px", marginTop: "100px" }}>
                <div className="d-flex flex-row justify-content-between" style={{ margin: "10px", width: "40vw" }}>
                    <div className="greeting">
                        <h4> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue" class="bi bi-app" viewBox="0 0 16 16">
                            <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z" />
                        </svg> {greeting()}  {showUsername}</h4>
                        <h5>It's {dateTime}</h5>
                    </div>
                    <div className="weather">
                        <h5><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue" class="bi bi-thermometer" viewBox="0 0 16 16">
                            <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z" />
                        </svg>{weather.city_name}</h5>
                        <h5>{toFahrenheit(weather.temp).toFixed(1) + "℉"} {weatherDescription}</h5>
                        <h6>Feels like {toFahrenheit(weather.app_temp).toFixed(1) + "℉"}c</h6>
                    </div>
                </div>
                <div className="d-flex bd-highlight" style={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", margin: "10px" }}>
                    <input className="p-2 flex-grow-1 bd-highlight" style={{ border: "none", borderRadius: "10px" }} type="text" value={todoInput} onChange={(e) => {
                        const value = e.target.value
                        setTodoInput(value)
                    }} placeholder="write a new task...." ></input>
                    {/* <div> */}
                    <select style={{ border: "none", borderRadius: "10px", backgroundColor: "lightgrey", margin:"3px" }} value={optionValue} onChange={(e) => {
                        const value = e.target.value
                        setOptionValue(value)
                    }} >
                        <option>select category</option>
                        {categoriesName.map(option => (
                            <option key={option.value} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                    <button type="button" className="btn btn-outline-primary" style={{margin:"3px"}} onClick={async () => {
                        if (!todoInput) {
                            return;
                        }// if input is empty, do not add anything
                        if (categories.length === 0) {
                            setTodoInput('')
                            return;
                        }// if there is no categories, then do not add 

                        const newTodo = { text: todoInput }
                        setTodoInput('')//once input is added, clear input

                        const checkedCategoryIds = optionValue // get category Id that are selected

                        setIsCategoryDataLoading(true)
                        const resTodo = await saveTodo(newTodo, [checkedCategoryIds])//send post request here.
                        setIsCategoryDataLoading(false)
                        //If respond is sucess, then grab the toDoId and push it to Todos
                        //so that I can use it for delete functionality

                        if (resTodo.success) {
                            const toDoId = resTodo.toDoId;
                            const toDoAddedCategoryName = resTodo.categoryInfo.name
                            setTodos([...todos, { ...newTodo, toDoId, toDoAddedCategoryName }])
                        }
                    }}>add</button>
                    {/* </div> */}
                </div>

                {todos.map((todo, index) => (

                    <div key={index} className="d-flex bd-highlight" style={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", margin: "10px" }}>
                        <span className="p-2 flex-grow-1 bd-highlight" onClick={handleClickStrikeThrough}>{todo.text}</span>
                        <span className="p-2 bd-highlight" style={{ backgroundColor: "lightgrey", borderRadius: "10px", margin:"3px" }} >{todo.categoryName}</span>
                        <button type="button" className="btn btn-outline-primary" style={{ margin: "5px" }} onClick={async () => {
                            setIsCategoryDataLoading(true)
                            await deleteTodo([todo])//delete request sends to the backend
                            setIsCategoryDataLoading(false)
                        }}>delete</button>
                    </div>
                ))}

            </div>
        </form>

    )

}

export default TodoPage

// saving todo on the browser
// delete function useeffect
// maybe delete function for todo as well
// work on use effect for todo
// name variable
