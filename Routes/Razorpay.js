const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

// Razorpay instance
const razorpay = new Razorpay({
    key_id: "rzp_test_nFf0JdxnLRziKM",
    key_secret: "ox8R0a6Ro7ISJWjOWKoiGh7j",
});

// Route to create an order
router.post("/createOrder", async (req, res) => {
    const { amount } = req.body; // Amount in INR
    const options = {
        amount: amount * 100, // Convert INR to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Payment initiation failed", error });
    }
});

module.exports = router;
