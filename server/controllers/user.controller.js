const mdb = require("../models");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const User = mdb.user;

registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // ver si existe el usuario o el email
  const existingUserByUsername = await User.findOne({ username });
  const existingUserByEmail = await User.findOne({ email });

  if (existingUserByUsername || existingUserByEmail) {
    // si existe el usuario o el email
    res.status(422).json({
      errors: {
        body: "Username or email already exists",
      },
    });
    return;
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    username,
    password: hashedPwd,
    email,
  };

  const createdUser = await User.create(userObject);

  if (createdUser) {
    res.status(201).json({
      user: createdUser.toLoginResponse(),
    });
  } else {
    res.status(422).json({
      errors: {
        body: "Unable to register a user",
      },
    });
  }
});

getCurrentUser = asyncHandler(async (req, res) => {
  let user;

  if (req.params.id) {
    const id = req.params.id;
    user = await User.findById(id).exec();

    return res
      .status(200)
      .json(user.toUserResponse(req.loggedin ? req.userId : false));
  } else {
    const email = req.userEmail;

    user = await User.findOne({ email }).exec();
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json({
    user: user.toUserResponse(),
  });
});

followOrUnfollowUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const userProfile = await User.findOne({ _id: id }).exec();
  if (!userProfile) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const userLogged = await User.findOne({ _id: userId }).exec();

  if (!userLogged) {
    return res.status(404).json({ message: "User Not Found" });
  }
  
 if(id != userId){
  (await userProfile.toUserResponse(userLogged._id).following)
    ? await userLogged.unfollow(userProfile)
    : await userLogged.follow(userProfile);
    res.status(200).json({
      message: "success",
    });
 }else{
  res.status(401).json({
    message: "No puedes seguirte a ti mismo",
  });
 }  
});

userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const loginUser = await User.findOne({ email }).exec();

  if (!loginUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const match = await bcrypt.compare(password, loginUser.password);

  if (!match)
    return res.status(401).json({ message: "Unauthorized: Wrong password" });

  res.status(200).json({
    user: loginUser.toLoginResponse(),
  });
});

updateUser = asyncHandler(async (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ message: "Required a User object" });
  }

  const email = req.userEmail;

  const target = await User.findOne({ email }).exec();

  if (user.email) {
    emailExists = await User.findOne({ email: user.email }).exec();
    if (emailExists && user.email != email) {
      return res.status(401).json({
        message: "El email ya existe!",
      });
    }
    target.email = user.email;
  }
  if (user.username) {
    target.username = user.username;
  }
  if (user.password && user.oldPassword) {
    const isValid = await bcrypt.compare(user.oldPassword, target.password);
    if (!isValid) {
      return res.status(401).json({
        message: "No es la antigua contraseña!",
      });
    }
    const hashedPwd = await bcrypt.hash(user.password, 10);
    target.password = hashedPwd;
  }
  if (typeof user.image !== "undefined") {
    target.image = user.image;
  }
  if (typeof user.bio !== "undefined") {
    target.bio = user.bio;
  }
  await target.save();

  return res.status(200).json({
    user: target.toLoginResponse(),
  });
});

module.exports = {
  registerUser,
  getCurrentUser,
  userLogin,
  updateUser,
  followOrUnfollowUser,
};
