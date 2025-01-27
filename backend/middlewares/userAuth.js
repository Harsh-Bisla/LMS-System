const jwt = require('jsonwebtoken');


const isUserAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token == "null") return res.send({ message: "please login", success: false });;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.send({ message: "not authenticated", success: false });
        req.user = decoded;
        next();
    } catch (error) {
        return res.send({ message: "Internal Server error", success: false });
    }
}

module.exports = isUserAuth;