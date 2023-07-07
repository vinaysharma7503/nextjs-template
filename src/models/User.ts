import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:[true,"Username is Required"],
    unique : true
},
email:{
    type: String,
    required:[true,'Email Address Is Required'],
    index: {unique: true}  // To make email address as a unique field in the
},
password:{
    type: String,
    required:[true,'Password is Required'],  //To hide password hash value while retrieving data using find() method of Mong
},
isVerified:{
    type:Boolean,
    default:false     // Default Value for Verification Status Of The Account
},
isAdmin:{
    type: Boolean,
    default:false      // Admin Privilege For Managing Users And Posts In Our App
},
forgotPasswordToken:String,
forgotPasswordExpiry:Date,    // Expiration Time After Which Password Reset Token Will Be Invalidated
verifyToken:String,
verifyTokenExpiry:Date,
createdAt:{type: Date ,default:new Date()},
updatedAt:{type: Date }
})
const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User
