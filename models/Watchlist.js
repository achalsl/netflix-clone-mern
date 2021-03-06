const mongoose = require('mongoose')
const WatchlistSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        type: { type: String },
        genre: { type: String },
        content: { type: Array }
    }, 
    { timestamps: true }
)

module.exports = mongoose.model('Watchlist', WatchlistSchema)