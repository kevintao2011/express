import express from "express";
import connectDB from "./utils/connectDB.js";
import "dotenv/config";


const app = express()
const port = 3000


app.get('/', (req, res) => {
    connectDB();
    res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})