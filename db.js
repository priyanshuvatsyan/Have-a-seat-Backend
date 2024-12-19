const mongoose = require("mongoose");

const mongoUri = 'mongodb+srv://priyanshuvatsyan:milkshake1glass@gofood.kl4ck.mongodb.net/gofood?retryWrites=true&w=majority&appName=gofood';

const mongoDb = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB successfully!");

        // Fetch the 'foodCategory' collection
        const fetchedData = mongoose.connection.db.collection("foodData"); // Ensure this is from the 'gofood' DB
        const foodCategory = mongoose.connection.db.collection("foodCategory");
      
        

        // Fetch all documents from 'foodCategory'
        const data = await fetchedData.find({}).toArray();
        const foodCat = await foodCategory.find({}).toArray();
        
        global.foodItems = data;
        global.foodItems_foodCat = foodCat;
        /* console.log(foodItems); */
        

       /*  // Print the fetched data
        if (data.length === 0) {
            console.log("No data found in the 'foodCategory' collection.");
        } else {
            console.log("Fetched data from 'foodCategory':", data);
        } */
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error.message);
        process.exit(1);
    }
};

module.exports = mongoDb;
