/*
///////////////////
// Requirements //
/////////////////
*/

require('dotenv').config()
const express = require('express')
const server = express()
const morgan = require('morgan')
const cors = require('cors');
const {PORT = 4000} = process.env // server port

const { client } = require('./server/db')


/*
//////////////////////
// Connect and Run //
////////////////////
*/

client.connect()
server.use(cors());

// body-parser & logging middleware
server.use(morgan('tiny'))
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// express static for build files

const path = require('path')
server.use('/', express.static(path.join(__dirname, 'build')))

const apiRouter = require('./server/api')
server.use('/api', apiRouter)

// For any get routes that are not in /api, rely on ReactRouter to handle
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Error Handler
server.use((err, req, res, next) => {
    let status = err.status || 500
    res.status(status).json({
        error: 'An error has occurred: ' + err.message,
        status,
    })
})

// 404 Handler
// server.use('*', (req, res) => {
//     res.status(404).send('Invalid Request.  Try again.')
// })

server.listen(PORT, () => console.log(`Starting server on port: ${PORT}`))