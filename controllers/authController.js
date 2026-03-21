const userModel = require("./models/userModel");

exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};
exports.registerContoller = async () => { };
exports.loginController = async () => { };
exports.logoutCcntroller = async () => { };