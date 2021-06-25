const jsonwebtoken = require('jsonwebtoken')

const verifyTokenUser = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.json({success: false, message: 'Access token not found'})
    
    try {
        const decodedData = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN)
        req.userId = decodedData.userId
        next()
    }
    catch (error) {
        console.log(error)
        return res.json({success: false, message: 'Invalid token'})
    }
}

const verifyTokenCook = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.json({success: false, message: 'Access token not found'})
    
    try {
        const decodedData = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN)
        req.cookId = decodedData.cookId
        next()
    }
    catch (error) {
        console.log(error)
        return res.json({success: false, message: 'Invalid token'})
    }
}

const verifyTokenManager = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.json({success: false, message: 'Access token not found'})
    
    try {
        const decodedData = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN)
        req.managerId = decodedData.managerId
        next()
    }
    catch (error) {
        console.log(error)
        return res.json({success: false, message: 'Invalid token'})
    }
}

module.exports = {verifyTokenUser, verifyTokenCook, verifyTokenManager}