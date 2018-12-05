/**
 * @author [siwilizhao]
 * @email [siwilizhao@mail.com]
 * @create date 2018-12-03 10:29:25
 * @modify date 2018-12-03 10:29:25
 * @desc [axel 封装]
*/
class Axel {
    constructor() {}

    async download(task, parameters = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        res_timeout: 3600 * 1000,
        req_timeout:60 * 1000,
        encoding: 'binary'
    }) {
        
    }
}

module.exports = new Axel()