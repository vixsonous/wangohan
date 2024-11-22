import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const be = `http://${hostname}:${port}`;
const userSockets = new Map();
const socketUsers = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
    console.log('A user connected', socket.id);
    console.log(socketUsers);
    console.log(userSockets);
  
    // Handle chat messages
    socket.on('chat message',async (message) => {
      io.emit('chat message', message); // Broadcast the message to all connected clients
      await fetch(`${be}/api/socket`, {
        method: 'POST',
        body: JSON.stringify({message: 'This is a message'})
      })
    });
    
    socket.on('register', async (user_id) => {
      const arr = userSockets.get(user_id);
      socketUsers.set(socket.id, user_id);
      
      if(arr === undefined) {
        userSockets.set(user_id, [socket.id]);
      } else {
        if(!arr.includes(socket.id)) {
          const newArr = [...arr,socket.id];
          userSockets.set(user_id, newArr);
        }
        
      }

    });

    socket.on('like recipe',async (message) => {
      const data = JSON.parse(message);
      const conns = userSockets.get(data.user_id);

      for(let i = 0; i < conns.length; i++) {
        io.to(conns[i]).emit('like recipe', message);
      }
  
      await fetch(`${be}/api/socket`, {
        method: 'POST',
        body: JSON.stringify({message: 'This is a message'})
      })
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      const arr = userSockets.get(socketUsers.get(socket.id));
      if(arr) {
        const idx = arr.indexOf(socket.id);

        if(idx > -1) {
          arr.splice(idx, 1);
          userSockets.set(socketUsers.get(socket.id), arr);
          socketUsers.delete(socket.id);
        }
        
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log("initiating bitch");
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});