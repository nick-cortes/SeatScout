import User from "../models/User.js";

export async function login(req, res) {
    try {
        if (req.oidc.isAuthenticated()) {
            const user = await User.findOne({auth0Id: req.oidc.user.sub});
            if (!user) {
                console.log("First time login, creating User profile");
                const newUser = new User({
                    auth0Id: req.oidc.user.sub,
                    email: req.oidc.user.email
                });
                await newUser.save();
            } else {
                console.log("Returning user logged in");
            }
        }
        res.redirect("http://localhost:5173/");
    } catch (error) {
        console.log("Error in login controller");
        res.status(500).json({message:"Internal server error"});
    }
};