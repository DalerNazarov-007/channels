const jwt = require("jsonwebtoken");
const { SECRET_KEY_ACCESS } = require("../configuration/configuration");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send({ message: "Access token missing." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).send({ message: "Malformed token. Please check the 'Authorization' header." });
    }

    jwt.verify(token, SECRET_KEY_ACCESS, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden: Invalid or expired token" });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
