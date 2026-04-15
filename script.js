import express from "express" ;
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js" ;
import bookServiceRoutes from "./routes/bookService.js" ;
import axios from "axios" ;
import session from "express-session";
import dotenv from "dotenv" ;

dotenv.config() ;

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); 
app.set("view engine", "ejs");
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();   // user is logged in
  } else {
    return res.redirect("/"); // block access
  }
}

app.get("/" , (req,res) => {
  res.render("auth/Login" , {errorMessage : ""}) ;
});

app.get("/home" , isAuthenticated, (req,res) => {
  res.render("home") ;
});

app.use("/book" , bookServiceRoutes) ;

app.use("/login" , authRoutes) ;

app.listen(port , () => {
  console.log(`Listinening on http://localhost:${port}`) ;
});