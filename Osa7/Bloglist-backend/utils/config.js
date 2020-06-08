require('dotenv').config()
//process.env.PORT
//process.env.MONGODB_URI
let PORT = 3001
let MONGODB_URI = 'mongodb+srv://KayttajaOsa4:salasanaosa4@testia-zhaxe.mongodb.net/test?retryWrites=true&w=majority'
let TEST_MONGODBURI = 'mongodb+srv://KayttajaOsa4:salasanaosa4@testia-zhaxe.mongodb.net/test?retryWrites=true&w=majority'

if(process.env.NODE_ENV === 'test') {
    MONGODB_URI = TEST_MONGODBURI
}

module.exports = {
    PORT,
    MONGODB_URI
}