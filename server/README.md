# Todo-fullstack-project


ToDo List

Feature List:
    [Core] Registration and Login
    [Core] CRUD ToDo's
    [Stretch] ToDo's organized by Category
    [Stretch] CRUD Categories
    [Stretch] ToDo Calendar Display
    [Super Stretch] Calendar dynamically displays ToDo's with Category selection
    [Super Stretch] API Integration with Weather, Time/Date

Data Schema

User {
    uid: {uuid}
    username
    password
    email
    categoryIdList: {uuid[]} (Category)
}

ToDo {
    toDoId: {uuid}
    name
    ownerId: {uuid} (User)
    description
    createdAt: {Date}
    startAt: {Date}
    completedAt: {Date}
    isComplete: {Boolean}
}

Category {
    categoryId: {uuid}
    name
    toDoIdList: {uuid[]} (ToDo)
}

Example: 

    User {
        email: james@gmail.com,
        categoryIdList: [123, 333, 432]
    }

    Category {
        categoryId: 123,
        name: "All",
        toDoIdList: [11, 32, 44]
    } 
    Category {
        categoryId: 333,
        name: "Work",
        toDoIdList: [11, 32]
    } 
    Category {
        categoryId: 432,
        name: "Groceries",
        toDoIdList: [44]
    } 

    ToDo {
        toDoId: 11,
        name: "Write Up Assignment"
    }
    ToDo {
        toDoId: 32,
        name: "Grade Homework"
    }
    ToDo {
        toDoId: 44,
        name: "Pick Up Milk"
    }

Note:
    On user registration -> create user, create default("Home") category for user

    On user login -> get user, get user's categories, get user's categories' toDo's