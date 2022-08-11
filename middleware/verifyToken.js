const User = require('../Model/UserModel');

const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {

        // res.send(req.headers.authorization);
        // return;
        let user = await User.find({ token: req.headers.authorization });

        // res.send(user);

        // return

        if (user.length > 0) {
            return next();
        }
        else {
            return res.status(400).send("Invalid user access");
        }
    }
    return res.status(400).send("Invalid user access");
}

module.exports = verifyToken;