const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

// components(routers)
const Users = require("./routers/Users");
const Users_me = require("./routers/Users_me");

const error_root = require("./errors/root_error");

//const's
const app = express();
const mode = app.get("env");
const port = config.get("port");

//express shit
const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/Users/", Users);
app.use("/api/Users/me/", Users_me);

//remove useless shit
// app.use((req, res, next) => {
//   res.palyload.id = undefined;
// });

//error's
app.use(error_root);

app.listen(port, () => {
  console.log(`[+] stated on port <${port}> and in <${mode}> mode`);
});

//MongoDB
const url = config.get("MongoDB_url");
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err == null) console.log(`[+] conned to mongoDB.....<${mode}>`);
    else console.log(`[-] can not connect to mongoDB atlas .....<${mode}>`);
  }
);
