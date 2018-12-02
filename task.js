(async() => {
    const path = require('path')
    const services = require('./index')
    const task = {
        "task_id": "test001",
        "project": "下载测试项目",
        "url": "https://nodejs.org/dist/v10.14.1/node-v10.14.1.pkg",
        "save_path": path.resolve('storage', 'files'),
        "save_name": "node-v10.14.1.pkg",
        "file_type": "file",
    }
    await services.redis.lpush('AXIES_DOWNLOAD_VIDEO_QUENE', JSON.stringify(task))
})()