const jwt = require('jsonwebtoken');
const Crypto = require('crypto');

module.exports = {
    hashPassword: (password) => {
        return Crypto.createHmac("sha256", "JCAHLS-01").update(password).digest("hex");
    },
    createToken: (payload) => {
        let token = jwt.sign(payload, "JCAHLS-01", {
            expiresIn: "12h"
        });

        return token;
    },
    readToken: (req, res, next) => {
        jwt.verify(req.token, "JCAHLS-01", (err, decode) => {
            if (err) {
                console.log(err)
                res.status(401).send({
                    message: "User Not Authenticated"
                })
            }

            req.dataUser = decode;
            next();
        })
    }
}