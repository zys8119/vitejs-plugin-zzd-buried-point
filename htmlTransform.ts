import {ZzdBuriedPointType} from './type'

import {readFileSync} from 'fs'
import {resolve} from 'path'
import * as lodash from 'lodash'
import config from './config'
const htmlTransform = async(html:string, type:ZzdBuriedPointType) => {
    if (Object.prototype.toString.call(type) === '[object String]') {
        if (!config[type]) {
            throw Error(`请先至vite.config插件选项配置【vitejs-plugin-zzd-buried-point】配置类型为【${type}】的浙政钉相关配置信息，再重启项目。`)
        }
        if (!html) {
            throw Error('html 不能为空')
        }
        if (!type) {
            throw Error('这样钉配置类别名称type 不能为空')
        }
        try {
            const zzdHtml = lodash.template(readFileSync(resolve(__dirname,'./index.html'),'utf-8'))({
                ...config[type],
                gateway:config[type].gateway || 'zjzwfw.gov.cn'
            })
            return Promise.resolve(lodash.template(html)({
                zzdHtml:`-->${zzdHtml}<!--`
            }))
        } catch (e:any) {
            throw Error('【浙政钉埋点错误】' + e.message)
        }
    } else {
        return Promise.resolve(lodash.template(html)({
            zzdHtml:'很遗憾！未启用浙政钉应用埋点。'
        }))
    }
}
export default htmlTransform
