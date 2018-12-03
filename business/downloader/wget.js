/**
 * @author [siwilizhao]
 * @email [siwilizhao@mail.com]
 * @create date 2018-12-03 10:29:07
 * @modify date 2018-12-03 10:29:07
 * @desc [wget 下载封装]
*/
class Wget {
    constructor() {}

    async download(task, parameters = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        res_timeout: 3600 * 1000,
        req_timeout:60 * 1000,
        encoding: 'binary'
    }) {
        return new Promise((resolve,reject) => {
            const {spawn} = require('child_process')
            const {
                url,
                save_path,
                save_name,
                task_id,
                project
            } = task
            // 下载报告
            const report = {
                project: project,
                task_id: task_id,
                task: task,
                parameters: parameters,
                start: Date.now()
            }
            const options = [url];
            const ls = spawn('wget', options)
            ls.stdout.on('data', data => {
                
            })
            ls.stdout.on('error', data => {
                reject(report)
            })
            ls.stdout.on('close', data => {

            })
            ls.stdout.on('end', data => {
                resolve(report)
            })
        }).catch(error => {
            return false
        })
    }
}

module.exports = new Wget()