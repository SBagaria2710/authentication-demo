const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { generateAuthToken, authenticate } = require("./auth");

const app = express();

// Fake DB
const users = [];
const COOKIE_NAME = "teamShikshaToken";
const COOKIE_EXPIRES = new Date(Date.now() + 300000); // 5 mins

// Middleware
app.use(express.json(), cookieParser());


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
    if (!user) return res.status(400).send("User not found");
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = generateAuthToken({ name: req.body.name });

            res.cookie(COOKIE_NAME, token, {
                expires: COOKIE_EXPIRES,
                httpOnly: true, // An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data.
                sameSite: "lax"
            });

            res.send("Successfully loggedin");
        } else {
            res.send("Not Allowed");
        }
    } catch (err) {
        res.status(500).send();
    }
});

app.post("/users/logout", (_, res) => {
    try {
        res.clearCookie(COOKIE_NAME);
        res.status(200).send("Logout successful, cookie cleared");
    } catch (err) {
        console.log(err)
        res.status(500).send('Some thing went wrong')
    }
});

// Protected Routes
app.get("/dashboard", authenticate, (_, res) => {
    res.status(200).send("Access Allowed for Dashboard!");
});

// Public Route
app.get("/health", (_, res) => {
    res.status(200).send("All good! Thanks for checking :)");
});

app.listen(3000);