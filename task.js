(async() => {
    const path = require('path')
    const services = require('./index')
    const task = {
        "task_id": "test001",
        "project": "下载测试项目",
        "url": "https://www3809.playercdn.net/188/0/4ZPD-9pfF7MZDdeeRW_myw/1544067406/180829/wtRK6n2n3prSvRK.mp4",
        "save_path": path.resolve('storage', 'files'),
        "save_name": "wtRK6n2n3prSvRK.mp4",
        "file_type": "file",
    }
    const res = await services.redis.rpush('ARIES_DOWNLOAD_VIDEO_QUEUE', JSON.stringify(task))
    console.log(res)
})()