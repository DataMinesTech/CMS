const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const path = require("path");

//config file
dotenv.config({ path: "config/config.env" });

//Connect Database
connectDatabase();

__dirname = path.resolve();

app.listen(process.env.PORT, () => {
  console.log(`Server Working on Port http://localhost:${process.env.PORT}`);
});

// const io = require("socket.io")(server, {
//   pingTimeOut: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("socket connected");

//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     console.log("userData", userData._id);
//     socket.emit("connected");
//   });
// });
