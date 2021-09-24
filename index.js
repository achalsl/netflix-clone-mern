const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const watchlistRoute = require('./routes/watchlists')
const path = require('path')

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

app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/movies', movieRoute)
app.use('/watchlists', watchlistRoute)

app.use(express.static(path.join(__dirname, "/client/build")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})


app.listen(process.env.PORT || 8800, () => {
    console.log('backend server is running')
})