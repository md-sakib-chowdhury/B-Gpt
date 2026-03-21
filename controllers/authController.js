const userModel = require("./models/userModel");

exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};
//REGISTER
exports.registerContoller = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //exisitng user
        const exisitingEmail = await userModel.findOne({ email });
        if (exisitingEmail) {
            return next(new errorResponse("Email is already register", 500));
        }
        const user = await userModel.create({ username, email, password });
        sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.loginController = async () => { };
exports.logoutCcntroller = async () => { };