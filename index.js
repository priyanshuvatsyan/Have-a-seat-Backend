const express = require('express')
const app = express();
const mongoDb = require("./db");
mongoDb(); //called mongodb for execution 

const cors = require('cors');
const path = require('path'); // Add this line

// Enable CORS for all origins
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Remove the duplicate CORS configuration
app.use(express.json());

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