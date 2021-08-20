const mongoose = require('mongoose')
const MovieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String },
        img: { type: String },
        imgTitle: { type: String },
        imgThumbnail: { type: String },
        trailer: { type: String },
        video: { type: String },
        releaseYear: { type: String },
        genre: { type: String },
        ageLimit: { type: Number },
        isSeries: { type: Boolean, default: false }
    }, 
    { timestamps: true }
)

module.exports = mongoose.model('Movie', MovieSchema)