import express from "express" ;
import axios from "axios" ;
import bodyParser from "body-parser";
import db from "../db/database.js" ;
import pg from "pg" ;

const app = express();
const router = express.Router() ;

router.post("/" , async (req ,res) => {
  try {
    const {email , password , action} = req.body ;
    if(action === "SignIn") {
      const result = await db.query("SELECT password FROM users WHERE email = $1" , [email]) ;
      if(result.rows.length === 0) {
        res.render("../views/auth/Login" , {errorMessage : "User not found ! Register"}) ;
      } else {
        const storedPass = result.rows[0].password ;
        if(storedPass === password) {
          req.session.user = email;
          res.redirect("/home") ;
        } else {
          res.render("../views/auth/Login" , {errorMessage : "Incorrect Password ! Try again"}) ;
        }
      }
    } else if (action === "Register") {
      try {
        const checkResult = await db.query("SELECT password FROM users WHERE email = $1" , [email]) ;
        if(checkResult.rows.length > 0) {
          res.render("../views/auth/Login" , {errorMessage : "User already exists ! Try SignIn"}) ;
        } else {
          await db.query("INSERT INTO users (email , password) VALUES ($1 , $2)" , [email , password]) ;
          req.session.user = email;
          res.redirect("/home") ;
        }
      } catch(err) {
        console.log(err) ;
      }
    }
  } catch(err) {
    console.log(err) ;
  }
});

export default router ;