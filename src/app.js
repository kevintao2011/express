import express from "express";
import connectDB from "./utils/connectDB.js";
import createUser from "./utils/createUser.js";
import "dotenv/config";


const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  
    connectDB();
    res.send('Hello World!')
})

app.post('/', (req, res) => {
  createUser(req);
  
  res.send('created user')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})