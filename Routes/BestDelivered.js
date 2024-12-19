const express = require('express');
const router = express.Router();

router.post('/bestDelivered', (req,res)=>{
    try {
        const bestDeliveredItems = globalThis.foodItems.slice(0,3);
        res.send(bestDeliveredItems);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})


module.exports = router;