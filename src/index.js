const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//settings
app.set('port', process.env.PORT || 3000)

//middlewares


//sockets
require('./sockets')(io)

//static files
app.use(express.static(path.join(__dirname, 'public')))



//init
server.listen(app.get('port'), ()=>{
    console.log('server en puerto 3000')
})