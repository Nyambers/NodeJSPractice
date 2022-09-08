const users = [
    {
        username: 'admin',
        password: '1234'
    }
]

const isAuthorized = ({username, password}) => {
    return !!(users.find(user => 
        user.username === username && 
        user.password === password
    ))
}

module.exports = {
    isAuthorized
}