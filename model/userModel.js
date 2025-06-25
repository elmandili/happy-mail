import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    prefs: {
        language: {type: String},
        lang_level: {type: String},
        paragraphs: {type: Number},
        interests: {type: String},
        genre: {type: String},
        frequency: {type: String},
        time: {type: String},
        your_story: {type: String}
    },
    stories: []
})


export default mongoose.model("users", userSchema);