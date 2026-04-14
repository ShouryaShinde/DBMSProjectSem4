import express from "express" ;
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js" ;
import axios from "axios" ;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.set("view engine", "ejs");

app.get("/" , (req,res) => {
  res.render("auth/Login") ;
});

app.use("/login" , authRoutes) ;

app.listen(port , () => {
  console.log(`Listinening on http://localhost:${port}`) ;
});