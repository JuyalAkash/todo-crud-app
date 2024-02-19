import User from "../../models/user.model.js";
import CustomError from "../../utils/customError.js";

// USER REGISTER CONTROLLER
const userRegisterController = async (req, res, next) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;
  if (!firstname || !lastname || !email || !password || !confirmpassword) {
    return next(new CustomError("Please provide all the fields.", 400));
  }
  try {
    // Check a existing user before create a new user
    const existUser = await User.findOne({ email }).exec();
    if (existUser) {
      return next(new CustomError("User is already exists.", 409));
    }
    // Creating a new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    });
    let accessToken = await newUser.createAccessToken();
    if (newUser) {
      return res.status(201).json({
        message: "New user created!",
        user: {
          _id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          token: accessToken,
        },
      });
    }
  } catch (error) {
    return next(error.message);
  }
};

export default userRegisterController;
