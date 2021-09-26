const BASE_URL = "http://localhost:3000";
const endpoints = {
    users : {
        register : '/users/register',
        login : '/users/login',
        update : '/users',
        getUserData :'/users'
    },
    todos : {
        todos : '/todos'
    },
    projects : {
        projects : '/projects',
        column : '/projects/column',
        notes  : '/projects/note',
        comment  : '/projects/note/comment'
    }
}

export {
    BASE_URL,
    endpoints
}