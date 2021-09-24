const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const verify = require('../verifyToken')


// UPDATE USER
router.put('/:id', verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.CRYPT_SECRET_KEY
            ).toString()
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, 
                { $set: req.body }, 
                { new: true }
            )
            return res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can update only your account')
    }
})

// DELETE USER
router.delete('/:id', verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json('User profile deleted successfully')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can delete only your account')
    }
})

// GET USER STATS
router.get('/stats', async (req, res) => {
    const today = new Date()
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            }, {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// GET ONE USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        return res.status(200).json(info)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// GET ALL USERS
router.get('/', verify, async (req, res) => {
    const query = req.query.new
    if(req.user.isAdmin) {
        try {
            const users = query === 'true' ? await User.find().sort({_id: -1}).limit(5) : await User.find()
            return res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not authorized to see all users')
    }
})

module.exports = router
