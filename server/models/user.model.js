import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const {
  AUTH_ACCESS_TOKEN_SECRET,
  AUTH_REFRESH_TOKEN_SECRET,
  AUTH_ACCESS_TOKEN_EXPIRY,
  AUTH_REFRESH_TOKEN_EXPIRY,
} = process.env;

/**
 * DATABASE MODEL SCHEMA FOR USER
 */
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      min: 6,
      max: 255,
      required: ["Please fill in your first name", true],
      match: [
        new RegExp(
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        ),
        "First name can not contain number and special character",
      ],
    },
    lastname: {
      type: String,
      trim: true,
      min: 6,
      max: 255,
      required: ["Please fill in your last name", true],
      match: [
        new RegExp(
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        ),
        "First name can not contain number and special character",
      ],
    },
    email: {
      type: String,
      trim: true,
      min: 6,
      max: 255,
      unique: true,
      required: ["Please fill in your email", true],
      match: [
        new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      min: 6,
      max: 10,
      required: ["Please fill in your password", true],
      match: [
        new RegExp(
          /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g
        ),
        "Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character",
      ],
    },
    confirmpassword: {
      type: String,
      trim: true,
      min: 6,
      max: 10,
      required: ["Please fill in your confirm password", true],
      match: [
        new RegExp(
          /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g
        ),
        "Confirm Password also must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character",
      ],
    },
    tokens: [
      {
        token: { required: true, type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * ATTACH MIDDLEWARE
 */

//pre save hook to hash password before saving user into the database:
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
      this.password = await bcrypt.hash(this.password, salt);
      this.confirmpassword = await bcrypt.hash(this.confirmpassword, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// compare user password with stored password in database for auth
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// define schema level methods to create access token
userSchema.methods.createAccessToken = async function () {
  try {
    const user = this;
    // Create signed access token
    const accessToken = jwt.sign(
      {
        _id: user._id.toString(),
        fullname: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      AUTH_ACCESS_TOKEN_SECRET,
      {
        expiresIn: AUTH_ACCESS_TOKEN_EXPIRY,
      }
    );
    return accessToken;
  } catch (error) {
    console.error(error.message);
    return;
  }
};

//define schema level methods to refresh token
userSchema.methods.createRefreshToken = async function () {
  try {
    const user = this;
    // Create signed access token
    const refreshToken = jwt.sign(
      {
        _id: user._id.toString(),
        fullname: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      AUTH_REFRESH_TOKEN_SECRET,
      {
        expiresIn: AUTH_REFRESH_TOKEN_EXPIRY,
      }
    );
    user.tokens.push({ token: refreshToken });
    await user.save();
    return refreshToken;
  } catch (error) {
    console.error(error);
    return;
  }
};
const User = mongoose.model("User", userSchema);
export default User;
