const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const user = require("./routes/userRoute");
const notify = require("./routes/notifyRoute");
const sendEmail = require("./routes/mailRoute");
const errorMiddleware = require("./middleware/error");
const fileupload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileupload({
    createParentPath: true,
  })
);

// app.use(cors());

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
//   );
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   next();
// });

// app.use(cors({ origin: true, credentials: true }));

app.use("/api/v1", user);
app.use("/api/v1", notify);
app.use("/api/v1", sendEmail);

app.use(errorMiddleware);

module.exports = app;
