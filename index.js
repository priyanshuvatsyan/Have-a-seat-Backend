const express = require('express')
const app = express();
const mongoDb = require("./db");
mongoDb(); //called mongodb for execution 

const cors = require('cors');

// Enable CORS for all origins
app.use(cors());

// Or configure CORS for specific origins

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


/*  Sending data from one port to another is by default blocked, as we are sending data from post 5000 to 5173 so we have to use this middleware */

app.get('/',(req,res)=>{
    res.send("server started");
})

app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.use('/api',require("./Routes/Razorpay"));
app.use('/api',require("./Routes/BestDelivered"));
app.use('/api',require("./Routes/test"));




app.listen(5000);