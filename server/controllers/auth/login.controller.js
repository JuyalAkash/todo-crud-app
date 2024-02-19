import User from "../../models/user.model.js";
import CustomError from "../../utils/customError.js";

// USER Login CONTROLLER
const userLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Email and Password are required.", 400));
  }
  try {
    // Check if user exists in database
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      return next(new CustomError("No user found!", 401));
    }
    //check if password is valid
    const isMatchPassword = await foundUser.comparePassword(password);
    if (!isMatchPassword) {
      return next(new CustomError("Invalid email or password", 401));
    }
    const accessToken = await foundUser.createAccessToken();
    const refreshToken = await foundUser.createRefreshToken();
    // SET refresh Token cookie in response
    res.cookie("jwtToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "User login successfully!",
      user: {
        _id: foundUser._id,
        email: foundUser.email,
        token: accessToken,
      },
    });
  } catch (error) {
    return next(error.message);
  }
};
export default userLoginController;
