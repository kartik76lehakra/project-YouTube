import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from"bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true, //to make it searchable in the database
        },

        email:{
            type:String,
            required:true,
            unique: true,
            lowecase: true,
            trim: true,
        },

        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar:{
            type: String, //we are using cloudinary
            required: true,
                    },

        
        coverImage:{
            type: String, //we are using cloudinary
            },

        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }

        ],
        password:{
            type: String,
            required: [true,  "password is required"]
        },
        refereshToken:{
            type: String,
        },
    },
{
    timestamps:true
}

    )

// never use arrow function within the pre as arrow function dont have its own this

    userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();  //isModified is pregiven function

        this.password = bcrypt.hash(this.password,10)
        next()
        //there is a serious issue as whenever we try to save this user model everytime this pre hook saves the password
        //solution: if there is any modification in the password only then update the password 
    })

//isPasswordCorrect is not a function we create this by using userSchema.methods 
userSchema.methods.isPasswordCorrect = async function(password){
   return bcrypt.compare(password,this.password)        
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){

    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFERESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFERESH_TOKEN_EXPIRY
        }
    )




}



export const User = mongoose.model("User", userSchema)