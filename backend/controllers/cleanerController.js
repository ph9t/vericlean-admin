const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Cleaner = require('../models/cleanerModel.js')

// @desc    Create a cleaner
// @route   POST /api/cleaners
// @access  ?
const registerCleaner = asyncHandler(async (req, res) => {
    const { name, email, password, contract_start, contract_end, role } = req.body

    if ( !name || !email || !password || !contract_start || !contract_end || !role ){
        res.status(400)
        throw new Error('Missing required fields.')
    }

    const cleanerExists = await Cleaner.findOne({email})
    if (cleanerExists){
        res.status(400)
        throw new Error('Cleaner already exists.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const cleaner = await Cleaner.create({
        name,
        email,
        password: hashedPass,
        contract_start,
        contract_end,
        role
    })

    if (cleaner){
        // res.status(201).json({
        //     _id: cleaner.id,
        //     name: cleaner.name,
        //     email: cleaner.email
        // })
        res.status(201).json({ message: `Account for cleaner ${name} had been created.`})
    } else {
        res.status(400)
        throw new Error('Unable to create an account.')
    }
})

// @desc    Log in a cleaner
// @route   POST /api/cleaners/login
// @access  Public
const loginCleaner = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const cleaner = await Cleaner.findOne({email})
    const payload = { id: cleaner._id }

    if (cleaner && (await bcrypt.compare(password, cleaner.password))){
        res.json({
            _id: cleaner.id,
            name: cleaner.name,
            email: cleaner.email,
            token: jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

// @desc    Get cleaner data
// @route   Get /api/cleaners/me
// @access  Private
const getMe = (req, res) => {
    res.json({ message: 'User data display' })
}

module.exports = { 
    registerCleaner, 
    loginCleaner,
    getMe
}