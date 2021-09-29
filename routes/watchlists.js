const router = require('express').Router()
const Movie = require('../models/Movie')
const { watch } = require('../models/Watchlist')
const Watchlist = require('../models/Watchlist')
const verify = require('../verifyToken')

// CREATE LIST
router.post('/', verify, async (req, res) => {
    if(req.user.isAdmin) {
        const newWatchlist = new Watchlist(req.body)

        try {
            const savedWatchlist = await newWatchlist.save()
            return res.status(201).json(savedWatchlist)
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You are not authorized to add this resource!')
    }
})


// get all watchlist movies
router.get('/:id/movies', verify, async (req, res) => {
    let watchlist
    try {
        const watchlist = await Watchlist.findById(req.params.id)
        let movieIds = watchlist.content
        let movies =  await Movie.find({'_id': { $in: movieIds } })
        return res.status(200).json(movies)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// GET LIST
router.get('/', verify, async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let watchlist = []

    try {
        if(typeQuery){
            if(genreQuery) {
                watchlist = await Watchlist.aggregate([
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            } else {
                watchlist = await Watchlist.aggregate([
                    { $match: { type: typeQuery } }
                ])
            }
        } else {
            watchlist = await Watchlist.aggregate([{ $sample: { size: 26 } }])
        }
        return res.status(200).json(watchlist)
    } catch (err) {
        console.log('err 500', err)
        return res.status(500).json(err)
    }
})

// Update LIST
router.put('/:id', verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updatedWatchlist = await Watchlist.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).json(updatedWatchlist)
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You are not authorized to update this resource!')
    }
})

// DELETE LIST
router.delete('/:id', verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await Watchlist.findByIdAndDelete(req.params.id)
            return res.status(200).json('Movie watchlist deleted successfully')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You are not authorized to delete this resource!')
    }
})



module.exports = router
