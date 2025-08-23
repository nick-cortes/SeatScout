import express from "express";

import { login } from "../controllers/authController.js";

const router = express.Router();

process.env.DEBUG = 'express-openid-connect:*'

// router.get("/", login);

router.get("/", login);

router.get("/test-login", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
})

router.get("/api/me", (req,res) => {
    res.json({
        isAuthenticated: req.oidc.isAuthenticated()
    })
});

export default router;