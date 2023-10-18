const mdb = require('../models')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = mdb.user;

registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    
    // confirm data
    if (!username || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = {
        username,
        "password": hashedPwd,
        email,
    };

    const createdUser = await User.create(userObject);

    if (createdUser) { // user object created successfully
        res.status(201).json({
            user: createdUser.toUserResponse(false)
        })
    } else {
        res.status(422).json({
            errors: {
                body: "Unable to register a user"
            }
        });
    }
});

getCurrentUser = asyncHandler(async (req, res) => {
    // After authentication; email and hashsed password was stored in req
    const email = req.userEmail;

    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({
        user: user.toUserResponse(false)
    })

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

    if (!match) return res.status(401).json({ message: 'Unauthorized: Wrong password' })

    res.status(200).json({
        user: loginUser.toUserResponse(true)
    });

});

updateUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    // confirm data
    if (!user) {
        return res.status(400).json({ message: "Required a User object" });
    }

    const email = req.userEmail;

    const target = await User.findOne({ email }).exec();

    if (user.email) {
        emailExists = await User.findOne({ email: user.email }).exec()
        if (emailExists && user.email != email) {
            return res.status(401).json({
                message: "El email ya existe!"
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
                message: "No es la antigua contraseña!"
            });
        }
        const hashedPwd = await bcrypt.hash(user.password, 10);
        target.password = hashedPwd;
    }
    if (typeof user.image !== 'undefined') {
        target.image = user.image;
    }
    if (typeof user.bio !== 'undefined') {
        target.bio = user.bio;
    }
    await target.save();

    return res.status(200).json({
        user: target.toUserResponse(true)
    });

});

module.exports = {
    registerUser,
    getCurrentUser,
    userLogin,
    updateUser
}