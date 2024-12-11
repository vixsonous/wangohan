import { createServer } from "node:http";
import express from 'express';
import next from "next";
import { Server } from "socket.io";
import path from "node:path";
import sharp from "sharp";
import fs from 'fs/promises';
import nodemailer from 'nodemailer';


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const be = `http://${hostname}:${port}`;
const userSockets = new Map();
const socketUsers = new Map();

const processFirebaseString = (url) => {
  const a = String(url);
  const [x,y] = a.split("/o/");
  const [z,b] = y.split("?");
  const string = x + "/o/" + encodeURIComponent(z) + "?" + b;
  return string;
}

app.prepare().then(() => {
  const expApp = express();

  expApp.use(express.json());
  const publicFolder = path.resolve(process.cwd(), 'public');

  expApp.get("/api/image", async (req, res) => {
    const {src,h=60 ,w=60, fit='cover', quality=100, format="webp", upscale=false, upscaleMethod="nearest"} = req.query;

    if(!src) {
      return res.status(400).json({error: "Image source is required"});
    }

    if(src.startsWith("/")) {
      const filePath = path.join(publicFolder, src);
      try {
        const imageBuffer = await fs.readFile(filePath);
        const processedImage = await sharp(imageBuffer)
          .resize(parseInt(w),parseInt(h),{fit: fit, kernel: sharp.kernel.nearest})
          .unflatten()
          .toFormat(String(format), {quality: parseInt(quality, 10)})
          .toBuffer();
        
        const metadata = await sharp(processedImage).metadata();
        const contentType = `image/${metadata.format === 'jpg' ? 'jpeg' : metadata.format}`;

        res.set('Content-type', contentType);
        return res.status(200).send(processedImage);
        
        
      } catch(e) {
        return res.status(400).send(e);
      }
    } else {
      
      const str = String(src).includes("firebase") ? processFirebaseString(src) : src;
      const response = await fetch(str, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',  // Ensure appropriate headers if needed
        },
      });
      if (!response.ok) {
        console.error(`Failed to fetch image: ${response.statusText}`);
        const tx = await response.text();
        console.log(response);
        console.log(tx);
        return src;
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const processedImage = await sharp(arrayBuffer)
        .resize(parseInt(w),parseInt(h),upscale ? {fit: fit, kernel: sharp.kernel[upscaleMethod]} : {fit: fit})
        .toFormat(String(format), {quality: parseInt(quality, 10)})
        .toBuffer();
      
      const metadata = await sharp(processedImage).metadata();
      const contentType = `image/${metadata.format === 'jpg' ? 'jpeg' : metadata.format}`;

      res.set('Content-type', contentType);
      return res.status(200).send(processedImage);
    }
    
  });

  expApp.post('/api/email', async (req, res) => {
    try {
      const {name, title, email, type, message} = req.body;
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_APP_EMAIL,
          pass: process.env.NODEMAILER_APP_PASS
        }
      });
  
      const mailOptions = {
        cc:  email,
        to: process.env.NODEMAILER_APP_EMAIL,
        subject: title,
        html: message
      }
  
      const response = transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          return res.status(500).json({message: error, data: info.response});
        } else {
          return res.status(200).json({message: 'Success!', data: undefined});
        }
      });

      return response;
  
    } catch(e) {
      return res.status(500).json({message:e.message, data: undefined});
    }
  });

  expApp.all("*", (req, res) => {
    return handler(req,res);
  });

  const httpServer = createServer(expApp);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
    console.log('A user connected', socket.id);
  
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
      const conns = userSockets.get(data.recipe_owner_id);
      console.log("User-id: " + data.user_id);
      console.log("Connections: ");
      console.log(conns);
      console.log("All Connections: ");
      console.log(userSockets);

      for(let i = 0; i < conns.length; i++) {
        io.to(conns[i]).emit('like recipe', JSON.stringify({...data, inserted: true}));
      }
  
      await fetch(`${be}/api/notification`, {
        method: 'POST',
        body: JSON.stringify({...data})
      });
    });

    socket.on('review recipe',async (message) => {
      const data = JSON.parse(message);
      const conns = userSockets.get(data.recipe_owner_id);

      for(let i = 0; i < conns.length; i++) {
        io.to(conns[i]).emit('review recipe', JSON.stringify({...data, inserted: true}));
      }
  
      await fetch(`${be}/api/notification`, {
        method: 'POST',
        body: JSON.stringify({...data})
      });
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