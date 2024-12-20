const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator'); //we are using this new thing which is validator used for validation purposes  
const bcrypt = require('bcryptjs'); // Replace bcrypt with bcryptjs

const jwt = require("jsonwebtoken");

// Route to create a user
router.post("/createuser", [
    // Validation rules
    body('name', 'Name is required and should be at least 3 characters').isLength({ min: 3 }).trim(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 3 }),
    body('email', 'Please provide a valid email').isEmail(),
    body('location', 'Location is required').not().isEmpty()
]
    , async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const { name, password, email, location } = req.body; // Extract user details from the request body

            // Create a new user in the database
            await User.create({
                name,
                password: secPassword,
                email,
                location,
            });

            // Send a success response
            res.json({ success: true, message: "User created successfully!" });
        } catch (error) {
            console.error("Error creating user:", error.message);

            // Send an error response
            res.status(500).json({ success: false, error: error.message });
        }
    });

router.post("/login", async (req, res) => {
    // Handle validation errors

    try {
        const { email, password } = req.body; // Extract user details from the request body

        // Create a new user in the database
        let user = await User.findOne({
            email
        });

        if (!user) {
            console.error("Error ", error.message);
        }

        const passwordCompare = await bcrypt.compare(req.body.password,user.password); //comparing hashed password
        if (!passwordCompare ) {
            console.error("Wrong password ", error.message);
        }

        //using jwt
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,"secret")

        return res.json({ success: true,authToken:authToken })

    } catch (error) {
        console.error("Error ", error.message);

        // Send an error response
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/services',(req,res)=>{
    res.render('../../src/screens/Services.jsx')
})

module.exports = router;
