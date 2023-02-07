const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "Error",
        });
        return;
    }

    try {
        const { userId } = jwt.verify(authToken, "brave_phoenix");
        user.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "Error",
        });
    }
};
