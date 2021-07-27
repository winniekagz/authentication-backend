const express=require('express');
const connectDB=require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config({ path: './config/config.env' });

connectDB();

const app=express();
const auth = require('./routes/routes');
app.use(express.json());
app.use(cors());

app.use('/api/auth', auth);

app.get('/', (res,req) =>{
    res.send("het you")
})
const PORT=4000;
app.listen(PORT,()=>{
    console.log(`APP RUNNING ON PORT ${PORT}`)
})