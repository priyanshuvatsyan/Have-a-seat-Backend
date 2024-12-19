const express = require('express');
const router = express.Router();

// Mock database or any data storage
let orders = [];

router.post('/api/create-order', async (req, res) => {
    try {
        const { order_data, email, order_date, isPreOrder, preOrderTime, totalPrice } = req.body;

        if (!order_data || !email || !totalPrice) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        const newOrder = {
            id: orders.length + 1,
            order_data,
            email,
            order_date,
            isPreOrder,
            preOrderTime,
            totalPrice,
        };

        orders.push(newOrder); // Add order to the mock database
        res.status(200).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error processing the order:", error);
        res.status(500).send("Internal server error.");
    }
});

module.exports = router;
