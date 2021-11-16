require('dotenv').config()
require('express-async-errors')
const express = require('express')
var path  = require('path')
var bodyParser = require('body-parser')
const notFoundMiddleware = require('./middleware/not-found')
const errrorMiddleware = require('./middleware/error-handler');
const cors = require('cors')

var index = require('./routes/index')
var tasks = require('./routes/tasks')
const port = 5000

//View Engine
const app=  express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

//Set Static Folder
app.use(express.static(path.join(__dirname, 'views')))

//BOdy Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//Database
const connectDB = require('./db/connect')

//cors MW
// app.use((req,res, next) => {
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
//     res.setHeader("Acess-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS")
// })
app.use(cors())

// routes
app.use('/api', tasks)
app.use('/', index)

// error handling MW

app.use(notFoundMiddleware)
app.use(errrorMiddleware)

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, function(){
            console.log('Server started at '+port)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()