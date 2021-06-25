const mongoose = require('mongoose')
const config = require('config')
const database = config.get('mongoDatabase')

const connectDatabase = async() => {
    try {
        await mongoose.connect(database, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('MongoDB connected')
    }
    catch(error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDatabase