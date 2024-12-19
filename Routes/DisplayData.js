const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try {
        res.send([global.foodItems,global.foodItems_foodCat]);
    } catch (error) {
        console.error(error.message);
        
    }
});


module.exports = router;