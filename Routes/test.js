const razorpay = require('razorpay');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const razorpayInstance = new razorpay({
    key_id: "RAZORPAY_KEY_ID",  // Replace with your Razorpay key ID
    key_secret: "RAZORPAY_KEY_SECRET"  // Replace with your Razorpay key secret
});

router.post('/api/test', async (req, res) => {
    try {
        const { totalPrice } = req.body;  // Extract totalPrice from request body

        if (!totalPrice) {
            return res.status(400).json({ error: "Total price is required" });
        }

        const options = {
            amount: totalPrice * 100,  // Amount in paise (Razorpay expects the amount in paise)
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        const order = await razorpayInstance.orders.create(options);
        
        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).send("Error generating payment order.");
    }
});

module.exports = router;
