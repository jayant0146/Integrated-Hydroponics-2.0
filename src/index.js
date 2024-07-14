import path from "path";
import express from "express";
import hbs from "hbs";
const app = express();
const port = process.env.PORT || 3000;
import "./db/conn.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // for named export
// import Register from "./models/registers";
const pathName = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(pathName));

import session from "express-session";
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
import authRoutes from "../routes/auth.js";
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/team", (req, res) => {
  res.render("team");
});
app.get("/statistics", (req, res) => {
  res.render("statistics");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    // console.log(req.body.username);
    res.send(req.body.username);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    // console.log(req.body.username);
    res.send(req.body.username);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("*", (req, res) => {
  res.render("404");
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
