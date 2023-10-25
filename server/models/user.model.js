module.exports = (mongoose, uniqueValidator, jwt) => {
    const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            index: true
        },
        bio: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: "https://100k-faces.glitch.me/random-image"
        },
    },
        {
            timestamps: true
        });

    userSchema.plugin(uniqueValidator);

    userSchema.method("toJSON", function () {
        const { __v, ...object } = this.toObject();
        return object;
    });

    userSchema.methods.generateAccessToken = function () {
        const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.password
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600s" }
        );
        return accessToken;
    }

    userSchema.methods.toUserResponse = function (log) {
        if (log) {
            return {
                _id: this._id,
                username: this.username,
                email: this.email,
                bio: this.bio,
                image: this.image,
                token: this.generateAccessToken()
            }
        } else {
            return {
                _id: this._id,
                username: this.username,
                email: this.email,
                bio: this.bio,
                image: this.image,
            }
        }
    };
    const User = mongoose.model("user", userSchema)
    return User

}