const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Head = require('../models/headModel.js')

const adminProtect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // try {
        //     token = req.headers.authorization.split(' ')[1]
        //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //     req.cleaner = await Cleaner.findById(decoded._id).select('-password')
        //     next()
        // } catch (error){
        //     console.log(error)
        //     res.status(401)
        //     throw new Error('User not authorized.')
        // }

        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role === 'head'){
            req.head = await Head.findById(decoded._id).select('-password')
            next()
        } else {
            res.status(401)
            throw new Error('User not authorized.')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized because no token sent in headers.')
    }
})

module.exports = { adminProtect }