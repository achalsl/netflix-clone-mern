const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

// CREATE MOVIE
router.post('/', verify, async (req, res) => {
    if(req.user.isAdmin) {
        const newMovie = new Movie(req.body)

        try {
            const savedMovie = await newMovie.save()
            return res.status(201).json(savedMovie)
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You are not authorized to add this resource!')
    }
})

// UPDATE MOVIE
router.put('/:id', verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, 
                { $set: req.body }, 
                { new: true }
            )
            return res.status(200).json(updatedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not authorized to edit this resource!')
    }
})

// DELETE MOVIE
router.delete('/:id', verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            return res.status(200).json('Resource has been deleted successfully!')
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not authorized to delete this resource!')
    }
})

// GET RANDOM MOVIE
router.get('/random', verify, async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if(type === 'series') {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 }}
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 }}
            ])
        }
        return res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET MOVIE
router.get('/:id', verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        return res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL MOVIES
router.get('/', verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const movies = await Movie.find()
            return res.status(200).json(movies.reverse())
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You are not authorized to view this resource!')
    }
    
})

module.exports = router
