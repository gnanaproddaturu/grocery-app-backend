



const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

exports.emilMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded token:", decoded);

        req.userId =
            decoded._id ||
            decoded.id ||
            decoded.userId;

        req.userEmail = decoded.email;

        if (!req.userId) {
            return res.status(401).json({
                message: "User ID not found in token"
            });
        }

        next();
    } catch (error) {
        console.error("JWT error:", error.message);

        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};