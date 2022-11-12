const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

// Fake DB
const users = [];

// Middleware
app.use(express.json());


// Endpoints
app.get("/health", (_, res) => {
    res.status(200).send("All good! Thanks for checking :)");
});

// Get All Users
app.get("/users", (_, res) => {
    res.status(200).json(users);
});

// Create User
/**
 * request = { user: String, password: String }
 */
app.post("/users", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            name: req.body.name,
            password: hashedPassword
        };
    
        console.log(req.body, user);
        // Push to Fake DB
        users.push(user);
    
        // Send Response
        res.status(201).send();
    } catch (err) {
        res.status(500).send();
    }
});

app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (user === null) return res.status(400).send("User not found");
    try {
        if(bcrypt.compare(req.body.password, user.password)) {
            res.send("Success");
        } else {
            res.send("Not Allowed");
        }
    } catch (err) {
        res.status(500).send();
    }
});

app.listen(3000);