// @desc    Create a cleaner
// @route   POST /api/cleaners
// @access  ?
const registerCleaner = (req, res) => {
    res.json({ message: 'register user'} )
}

// @desc    Log in a cleaner
// @route   POST /api/cleaners/login
// @access  Public
const loginCleaner = (req, res) => {
    res.json({ message: 'login user'} )
}

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