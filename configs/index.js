const path = require('path')
const fs = require('fs')
function loader(name) {
    if (checkFile(name)) {
        if (process.env.NODE_ENV == 'dev' ) {
            return  require(`./dev/${name}`)
        } else {
            return require(`./${name}`)
        }
    }
}

function checkFile(name) {
    if (!fs.existsSync(path.resolve('configs', `${name}.js`))) {
        console.log(`${name}.js for prod is not exists please check`)
        return false
    }
    if (!fs.existsSync(path.resolve('configs/dev', `${name}.js`))) {
        console.log(`${name}.js for dev is not exists please check`)
        return false
    }
    return true
}

module.exports = {
    cache: loader('cache'),
    redis: loader('redis'),
    mongodb: loader('mongodb'),
    logger: loader('logger'),
    constants: loader('constants'),
}
