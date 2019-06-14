require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const authCtrl = require("./controllers/auth_controller");

const app = express();

// MIDDLEWARE

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1501850180581050
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);

  console.log("Connected to db...");
});

// AUTH ENDPOINTS

app.post("/auth/register", authCtrl.register);

app.post("/auth/login", authCtrl.login);

app.get("/auth/current", authCtrl.current);

app.post("/auth/logout", authCtrl.logout);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
