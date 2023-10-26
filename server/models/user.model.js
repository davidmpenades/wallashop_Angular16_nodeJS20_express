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
        following:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        followers:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        
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

    userSchema.methods.toLoginResponse = function () {       
        return {
            _id: this._id,
            username: this.username,
            email: this.email,
            bio: this.bio,
            image: this.image,
            token: this.generateAccessToken()
        }
        
    };

    userSchema.methods.toUserResponse = function (userId = false) {        
        return {
            _id: this._id,
            username: this.username,
            email: this.email,
            bio: this.bio,
            image: this.image,
            following: this.following.includes(userId),
            followers: this.followers.includes(userId)
        }
    }

    userSchema.methods.follow = function (toFollow) {        
        this.addFollowing(toFollow._id)
        toFollow.addFollowers(this._id)
    }

    userSchema.methods.unfollow = function (toUnFollow) {
        this.removeFollowing(toUnFollow._id)
        toUnFollow.removeFollowers(this._id)
    }

    userSchema.methods.addFollowing = function(id){
        if(this.following.indexOf(id) === -1){
            this.following.push(id);
        }
        return this.save();
    }

    userSchema.methods.addFollowers = function(id){
        if(this.followers.indexOf(id) === -1){
            this.followers.push(id)
        }
        return this.save()
    }

    userSchema.methods.removeFollowing = function(id){
        if(this.following.indexOf(id) !== -1){
            this.following.remove(id);
        }
        return this.save();
    }

    userSchema.methods.removeFollowers = function(id){
        if(this.followers.indexOf(id) !== -1){
            this.followers.remove(id);
        }
        return this.save();
    }
    
    const User = mongoose.model("user", userSchema)
    return User

}