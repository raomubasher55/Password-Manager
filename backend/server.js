const connectToMongodb = require('./db');
connectToMongodb();
const express = require('express')
const cors = require('cors')

const app = express()
require('dotenv').config()
const port = 3000
console.log(process.env.MONGO_URL) // remove this after you've confirmed it is working 

app.use(cors())
//yhe middleware body me sy agr data nikalana h tw lagna hi pary ga
app.use(express.json()) 


app.use('/api',require('./routes/passwords'))



app.listen(port, () => {
  console.log(`PassOp is runing at port  ${port}`)
})