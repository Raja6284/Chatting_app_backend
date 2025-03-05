import { WebSocketServer,WebSocket } from "ws";

//creates a WebSocket server instance that listen to WebSocket connections on port:8080
const wss = new WebSocketServer({port:8080})

interface User{
    socket:WebSocket,
    roomId:string
}
let allSockets:User[] = []
let useCount = 0

//event handler
wss.on('connection',(socket)=>{
    
    socket.on('message',(message)=>{
        //@ts-ignore
        const parsedMessage = JSON.parse(message)//same as ts ignore
       
        if(parsedMessage.type == "join"){
            allSockets.push({
                socket:socket,
                roomId:parsedMessage.payload.roomId
            })
            console.log("user joined the room : " + parsedMessage.payload.roomId)
            useCount = useCount + 1
            console.log("userCoutn#"+useCount)
        }


        if(parsedMessage.type == "chat"){
            //console.log("user wants to chat")
            let currentUserRoom = null
            for(let i = 0; i<allSockets.length; i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].roomId
                }
            }

            for(let i = 0; i<allSockets.length; i++){
                if(allSockets[i].roomId == currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }   
        }

    })

    // socket.on("close",()=>{
    //     allSockets = allSockets.filter(x => x != socket)
    // })
})