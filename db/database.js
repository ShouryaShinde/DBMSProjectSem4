import express from "express" ;
import pg from "pg" ;

const db = new pg.Client({
  user : process.env.USER ,
  host : process.env.HOST ,
  database : process.env.DATABASE ,
  password : process.env.PASSWORD ,
  port : process.env.DBPORT
});

db.connect() ;

export default db ;