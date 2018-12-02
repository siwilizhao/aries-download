describe('business/downloader/request.js', () => {
    it('download',async () => {
        const path = require('path')
        const request = require('../business/downloader/request')
        const task = {
            "task_id": "test001",
            "project": "下载测试项目",
            "url": "https://nodejs.org/dist/v10.14.1/node-v10.14.1.pkg",
            "save_path": path.resolve('storage', 'files'),
            "save_name": "node-v10.14.1.pkg",
            "file_type": "file",
        }
        try {
            const res = await request.download(task)
            console.log(res)
        } catch (error) {
            console.trace(error)
        }

    });
});