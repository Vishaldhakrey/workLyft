import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: [3, "Your name must 3 or more character"],
        maxLength: [30, "Your name must be under 30 character"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type: String,
            default: ""
        },
        coverLetter: {type: String}
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);