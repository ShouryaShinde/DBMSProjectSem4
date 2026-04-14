import express from "express" ;
import axios from "axios" ;
import bodyParser from "body-parser";
import db from "../db/database" ;
import pg from "pg" ;

const app = express();
const router = express.Router() ;

router.post("/" , async (req ,res) => {
  try {
    const {email , password , action} = req.body ;
    if(action === "SignIn") {
      const storedPass = await db.query("SELECT password FROM userlogin WHERE email = $1" , [email]) ;
      console.log(storedPass) ;
    } else if (action === "Register") {
      console.log("register") ;
    }
  } catch(err) {
    console.log(err) ;
  }
});

export default router ;