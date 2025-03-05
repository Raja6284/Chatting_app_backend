import { WebSocketServer } from "ws";

//creates a WebSocket server instance that listen to WebSocket connections on port:8080
const wss = new WebSocketServer({port:8080})

let userCount = 0
let allSockets = []

//event handler
wss.on('connection',(socket)=>{
    
    allSockets.push(socket)
    userCount = userCount + 1
    console.log("userCount#" + userCount)

    socket.on('message',(message)=>{
        console.log("message received : " + message.toString())
        // setTimeout(()=>{
        //     socket.send(message.toString() + " from the server")
        // },2000)

        for(let i = 0; i<allSockets.length; i++){
            let c = allSockets[i];
            c.send(message.toString() + " from the server")
        }
    })
})