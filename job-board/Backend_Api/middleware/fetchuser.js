var jwt = require('jsonwebtoken');
const JWT_SECRET = 'aditya$oy';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "valid token" })

    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    fetchuser(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}


module.exports = { fetchuser, verifyTokenAndAuthorization };