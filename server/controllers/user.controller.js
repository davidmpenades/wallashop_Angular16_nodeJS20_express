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
            user: createdUser.toUserResponse()
        })
    } else {
        res.status(422).json({
            errors: {
                body: "Unable to register a user"
            }
        });
    }
});

// @desc get currently logged-in user
// @route GET /api/user
// @access Private
// @return User
// const getCurrentUser = asyncHandler(async (req, res) => {
    // After authentication; email and hashsed password was stored in req
//     const email = req.userEmail;

//     const user = await User.findOne({ email }).exec();

//     if (!user) {
//         return res.status(404).json({message: "User Not Found"});
//     }

//     res.status(200).json({
//         user: user.toUserResponse()
//     })

// });

userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const loginUser = await User.findOne({ email }).exec();

    if (!loginUser) {
        return res.status(404).json({message: "User Not Found"});
    }

    const match = await bcrypt.compare(password, loginUser.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized: Wrong password' })

    res.status(200).json({
        user: loginUser.toUserResponse()
    });

});

// // @desc update currently logged-in user
// // Warning: if password or email is updated, client-side must update the token
// // @route PUT /api/user
// // @access Private
// // @return User
// const updateUser = asyncHandler(async (req, res) => {
//     const { user } = req.body;

//     // confirm data
//     if (!user) {
//         return res.status(400).json({message: "Required a User object"});
//     }

//     const email = req.userEmail;

//     const target = await User.findOne({ email }).exec();

//     if (user.email) {
//         target.email = user.email;
//     }
//     if (user.username) {
//         target.username = user.username;
//     }
//     if (user.password) {
//         const hashedPwd = await bcrypt.hash(user.password, 10);
//         target.password = hashedPwd;
//     }
//     if (typeof user.image !== 'undefined') {
//         target.image = user.image;
//     }
//     if (typeof user.bio !== 'undefined') {
//         target.bio = user.bio;
//     }
//     await target.save();

//     return res.status(200).json({
//         user: target.toUserResponse()
//     });

// });

module.exports = {
    registerUser,
    // getCurrentUser,
    userLogin,
    // updateUser
}