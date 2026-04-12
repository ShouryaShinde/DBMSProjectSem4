import express from "express" ;
import axios from "axios" ;

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.set("view engine", "ejs");

app.get("/" , (req,res) => {
  res.render("home") ;
});

app.listen(port , () => {
  console.log(`Listinening on http://localhost:${port}`) ;
});