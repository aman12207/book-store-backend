const express = require('express');
const dotevn = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
const loginRoute = require('./routes/userRoute');
const bookRoute = require('./routes/bookRoute');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());    // if we don't do that we will not be able to use req.body to access 
app.use(cookieParser());
app.use(cors());            // to allow react app to make call

// using different routes
app.use('/api/v1',loginRoute);
app.use('/api/v1',bookRoute);
dotevn.config({path : 'config/config.env'})

// connect Database
connectDB();

app.use(errorMiddleware);       // using error middleware

app.listen(process.env.PORT || 4000,(req,res)=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })