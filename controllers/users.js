const userRouter = require('express').Router()

const users = [
    {
        id: 345,
        username: 'Amanat',
        password: '12345678'
    },
    {
        id: 234,
        username: 'admin',
        password: 'admin'
    },
]

userRouter.get('/', (req, res) => {
    res.json(users)
})

userRouter.post('/login', (req, res) => {
    if(!req.body.username || !req.body.password) res.status(400).send({error: 'Inputs missing'})
    
    res.json({status: 'Login successful'})
    
})

module.exports = userRouter