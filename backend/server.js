const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

const {addSecret, getSecret} = require("./db");

app.use(express.json());


app.post("/add-secret",async(req,res)=>{
   const {secret} = req.body;
   const response = await addSecret(secret);
   console.log("Response", response);
   res.send(response);
})


app.get("/get-secret",async(req,res)=>{

   try{
      const {id,key} = req.query;
      const response = await getSecret(id,key);
      console.log("Response", response);
      res.send(response);
   } catch(error){
      console.log("ERROR:", error);
      res.send({
         id:"",
         secret:""
      })
   }
})


app.listen(3000,(err)=>{
if(err) throw new Error(errr);
console.log("Server running at port 3000")
})
