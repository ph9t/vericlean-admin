const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Head = require('../models/headModel.js')

const loginHead = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    const head = await Head.findOne({ email })

    if (head && (await bcrypt.compare(password, head.password))){
        const payload = { _id: head._id, role: head.role }
        res.json({
            _id: head.id,
            name: head.name,
            email: head.email,
            token: jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials for a Head Household.')
    }
})

const headMe = asyncHandler(async (req, res) => {

})

module.exports = { loginHead, headMe }