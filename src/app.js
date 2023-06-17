import express from "express";
import connectDB from "./utils/connectDB.js";
import createUser from "./utils/createUser.js";
import "dotenv/config";
import editUser from "./utils/editUser.js";
import getUser from "./utils/getUser.js";
import tryConnectDB from "./utils/tryConnectDB.js";
import getinfo from "./utils/info/major.js";

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    await tryConnectDB()
    res.send('Hello World!')
})
app.post('/edituser', async (req, res) => {
  if(await editUser(req)){
    res.send('updateduser',200)
  }else{
    res.send('cannot updated user',500)
  }
  
})

app.post('/getuser', async (req, res) => {
  const user = await getUser(req);
  res.send(user)
  
  
})

app.post('/', (req, res) => {
  createUser(req);
  
  res.send('created user')
})

app.post('/info', async (req, res) => {
  const result = await getinfo(req);

  
  res.send(result)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})