const BASE_URL = "http://localhost:3000";
const endpoints = {
    users : {
        register : '/users/register',
        login : '/users/login',
        update : '/users'
    },
    todos : {
        todos : '/todos'
    }
}

export {
    BASE_URL,
    endpoints
}