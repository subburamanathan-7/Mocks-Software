const express  = require('express')
const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();

const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5000


const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/dbconfig');

const __dirname = path.dirname("")
const buildpath = path.join(__dirname,"../frontend/build")


connectDB()
const app = express();
app.use(express.json()) //Body Parser
app.use(express.urlencoded({extended:false})) //urlEncoded
app.use(cors({
    origin:"*"
})) //Cross-Orgin Access

app.use('/api/user',require('./routes/accessRoutes'));
app.use('/api/admin',require('./routes/adminRoutes'));
app.use('/api/student',require('./routes/studentRoutes'));
app.use('/api/incharge',require('./routes/inchargeRoutes'));
app.use('/api/interviewer',require('./routes/interviewerRoutes'));
app.use('/api/config',require('./routes/configRoutes'));


app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

app.use(errorHandler);//Overides default ErrorHandler

app.listen(port,()=> console.log(`App up and running on ${port}`))