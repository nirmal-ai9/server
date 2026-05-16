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
    res.end();
    }else if (req.url === "/login"){
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try{
          const data = JSON.parse(body);
          const {username, password} = data;
          if (!username || !password){
            res.writeHead(400, {"Content-Type": "application/json"});
            return res.end(JSON.stringify({
              success: false,
              message: "Missing fields 😳"
            }));
          }
        } catch{
          
        }
      });
    }
  }
);
server.listen(process.env.PORT, "0.0.0.0" , () => console.log("Server started successfully 🚀"));
