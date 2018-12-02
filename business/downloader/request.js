const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const mkdirs = require('siwi-mkdirs')
class Request {
    constructor() {

    }
    async download(task, parameters = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        res_timeout: 3600 * 1000,
        req_timeout:60 * 1000,
        encoding: 'binary'
    }) {
        return new Promise(async (resolve, reject) => {
            const {
                url,
                save_path,
                save_name,
                task_id,
                project
            } = task
            // 检查save path 创建多级目录
            if(!fs.existsSync(save_path)) {
                await mkdirs.multi(save_path)
            }
            const {
                headers,
                res_timeout,
                req_timeout,
                encoding
            } = parameters
            // 下载报告
            const report = {
                project: project,
                task_id: task_id,
                task: task,
                parameters: parameters,
                start: Date.now()
            }
            // 解析url
            const {
                protocol,
                search,
                pathname,
                port,
                hostname,
            } = new URL(url)
            // 组合请求 options
            const options = {
                hostname: hostname,
                port: port,
                path: `${pathname}${search}`,
                method: 'GET',
                headers: headers
            }
            const R = protocol == 'http:' ? http : https
            const req = R.request(options, res => {
                const {
                    statusCode,
                    statusMessage
                } = res
                
                report.statusCode = statusCode
                report.statusMessage = statusMessage
                console.log(`statusCode:${statusCode},statusMessage: ${statusMessage}`)
                if (statusCode != 200) {
                    res.resume()
                    report.end = Date.now()
                    reject(report)
                }
                // 文件设置 encoding 为 binary
                res.setEncoding(encoding)
                const stream = fs.createWriteStream(`${save_path}/${save_name}`, {
                    flags: 'w',
                    encoding: "binary",
                    fd: null,
                    mode: 0o666,
                    autoClose: true
                })
                res.setTimeout(res_timeout, () => {
                    report.res_time_out = true
                    report.result = '下载超时(res setTimeout)'
                    report.end = Date.now()
                    reject(report)
                })
                res.on('data', chunk => {
                    stream.write(chunk)
                })
                res.on('error', err => {
                    console.trace(err)
                    report.error = err
                    report.result = '下载出错(res on error)'
                    report.end = Date.now()
                    reject(report)
                })
                res.on('end', () => {
                    report.result = '下载完成(res on end)'
                    report.end = Date.now()
                    resolve(report)
                })
            })
            req.setTimeout(req_timeout, () => {
                req.abort()
                report.result = '下载超时(req setTimeout)'
                report.end = Date.now()
                reject(report)
            })
            req.end()
        }).catch(err => {
            console.log(`下载器内部错误`)
            console.trace(err)
            return false
        })
    }
}
module.exports = new Request()