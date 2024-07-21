import mongoose, { Schema, Document } from 'mongoose';
import moment from "moment-timezone";


const getCurrentDate = () => {
    return moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
};

// Define user schema
const userSchema = new Schema({
    
    username: {
        type: String,
        default: null,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    accessToken: {
        type: String,
        default: null,
        trim: true,
        index: true,
    },
    refreshToken: {
        type: String,
        default: null,
        trim: true,
        index: true,
    }
});

// Create and export model
export const User = mongoose.models.users || mongoose.model("users", userSchema);



// Define movie schema
const movieSchema = new Schema({
    banner: {
        type: String,
        required : true,
        trim: true,
    },
    name: {
        type: String,
        required : true,
        trim: true,
    },
    Genres: {
        type: String,
        required : true,
        trim: true,
    },
    category: {
        type: String,
        required : true,
        trim: true,
    },
    time_stamp: {
        type: String,
        default : null,
    },
    status: {
        type: Number,
        default : 0
    },
    uploader_name : {
        type: String,
        required : true,
        trim: true,
    }
}, { timestamps: true });

// Create and export model
export const Movie = mongoose.models.movies || mongoose.model("movies", movieSchema);

