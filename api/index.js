const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const watchlistRoute = require('./routes/watchlists')

dotenv.config()

mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( () => console.log("DB connection success"))
.catch((err) => console.log(err))

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/watchlists', watchlistRoute)

app.listen(process.env.PORT || 8800, () => {
    console.log('backend server is running')
})