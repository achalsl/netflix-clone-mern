const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } }
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
        duration: { type: String },
        ageLimit: { type: Number },
        isSeries: { type: Boolean, default: false }
    }, 
    { timestamps: true },
    opts
)

module.exports = mongoose.model('Movie', MovieSchema)