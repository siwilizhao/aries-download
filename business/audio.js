const services = require('../index')
const {AXIES_DOWNLOAD_AUDIO_QUENE} = services.configs.cache
const downloader = require('./downloader').request
class Downloader {
    constructor() {
    
    }
    async handler () {
        const taskJsonString = await services.redis.rpop(AXIES_DOWNLOAD_AUDIO_QUENE)
        if (!taskJsonString) {
            console.log(`no task wait`)
            return false
        }
        const task = JSON.parse(taskJsonString)
        try {
            const report = await downloader.download(task)
            await services.logger.info(report)
            return true
        } catch (error) {
            await services.logger.info(error)
            return false
        }
    }
}

// 执行器
(async () => {
    const downloader = new Downloader
    while (true) {
        const res = await downloader.handler()
        if (!res) {
            console.log('download res get false wait for 5s...')
            await services.wait(5000)
        }
    }
})()