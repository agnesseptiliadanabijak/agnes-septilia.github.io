const array = [
    {
        "id": 1,
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "123",
        "imageFileName": ""
    },
    {
        "id": 2,
        "username": "agnes",
        "email": "agnes@gmail.com",
        "password": "222",
        "imageFileName": ""
    },
    {
        "id": 3,
        "username": "rudi",
        "email": "rudi@gmail.com",
        "password": "aaa",
        "imageFileName": ""
    }
]


const email = "ee@gmail.com"
const password = "222"

function loginAuth(array, email, password) {
    let output = "";
    let i = 0;

    do {
        if (output === "success" || output === "wrongPassword") {
            break;
        }
        
        if (array[i].email === email) {
            if (array[i].password === password) {
                output = "success"
            } else {
                output = "wrongPassword"
            }
        } else {
            output = "emailNotFound"
        }
        
        i++
    }
    while (i < array.length)
    return { output: output, array: array[i-1]}    
}

function getUserName(array, email, password) {
    const authResult = loginAuth(array, email, password)
    if (authResult.output === "success") {
        return {username: authResult.array.username, photo: authResult.array.photo}
    } else {
        return authResult.output
    }
}

console.log(getUserName(array, email, password))