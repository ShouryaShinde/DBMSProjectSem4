import express from "express" ;
import session from "express-session";
import dotenv from "dotenv" ;
import authRoutes from "./routes/auth.js" ;
import bookServiceRoutes from "./routes/bookService.js" ;
import checkStatusRoutes from "./routes/checkStatus.js" ;
import dashboardRoutes from "./routes/dashboard.js" ;

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

app.use("/login" , authRoutes) ;
app.use("/book" , isAuthenticated ,bookServiceRoutes) ;
app.use("/checkstatus" , isAuthenticated , checkStatusRoutes) ;
app.use("/dashboard" , isAuthenticated , dashboardRoutes);

app.listen(port , () => {
  console.log(`Listinening on http://localhost:${port}`) ;
});