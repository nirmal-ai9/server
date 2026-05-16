const http = require("http");

const fs = require("fs");
const server = http.createServer( (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.url === "/" || req.url === "/index.html"){
    console.log("New request received");
    const ip = req.socket.remoteAddress;
    const now = new Date();
    fs.appendFile("log.txt", `IP: ${ip} | Date: ${now.toLocaleDateString()} | Time: ${now.toLocaleTimeString()}\n`, (err) => {
      if (err) throw err;
    } )
    res.end("Welcome to my server.");
  }else if (req.url === "/login"){
    res.end("Hi");  
  }
  }
);
server.listen(process.env.PORT || 8000 , "0.0.0.0" , () => console.log("Server started successfully 🚀"));
