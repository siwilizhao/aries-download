const Redis = require('ioredis')
const Logger = require('aries-logger').client
const configs = require('./configs')
let instance = null
const {
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD,
} = configs.redis

class Service {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }
}
// CONFIGS
Service.prototype.configs = configs
// REDIS
Service.prototype.redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
})
// LOGGER
Service.prototype.logger = new Logger(configs.logger)
// WAIT
Service.prototype.wait = require('siwi-wait')
// MKDIRS
Service.prototype.mkdirs = require('siwi-mkdirs')
// MD5
Service.prototype.md5 = require('siwi-md5')
// UNIQUESTRING
Service.prototype.uniquestring = require('siwi-uniquestring')
module.exports = new Service()