import {
    ZzdBuriedPoint as ZzdBuriedPointImplementsType,
    ZzdBuriedPointConfig,
    ZzdBuriedPointConfigBase, ZzdBuriedPointConfigUserInfo,
    ZzdBuriedPointType
} from './type'
import config from './config'
class ZzdBuriedPointClass implements ZzdBuriedPointImplementsType {
    public currConfig:ZzdBuriedPointConfig = {} as any
    public isValidity:boolean = true

    constructor(public type:ZzdBuriedPointType ) {
        if (Object.prototype.toString.call(type) === '[object String]') {
            if (config[type]) {
                this.currConfig = config[type]
                this.isValidity = true
            } else {
                throw Error(`请先至config.ts配置类型【${type}】的浙政钉相关配置，再重启项目。`)
            }
        } else {
            this.isValidity = false
        }
    }

    /**
     * 浙政钉--基础埋点
     */
    createBaseBurialPoint(config:ZzdBuriedPointConfigBase = {}) {
        if (this.isValidity) {
            try {
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['aplus-waiting', 'MAN']
                })
                aplus_queue.push({
                    action: 'aplus.sendPV',
                    arguments: [{
                        is_auto: false
                    }, {
                        sapp_id: this.currConfig.sapp_id,
                        sapp_name: this.currConfig.sapp_name,
                        page_id: config.page_id,
                        page_name: config.page_name,
                        page_url: config.page_url,
                    }]
                })
            } catch (e: any) {
                throw Error(e.message)
            }
        }
    }

    /**
     * 浙政钉--用户信息埋点
     * @param conifg
     */
    createUserInfoBurialPoint(config:ZzdBuriedPointConfigUserInfo = {}) {
        if (this.isValidity) {
            try {
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_hold', 'BLOCK']
                })
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_user_nick', config._user_nick]
                })
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_user_id', config._user_id]
                })
                if (this.currConfig._dev_id) {
                    aplus_queue.push({
                        action: 'aplus.setMetaInfo',
                        arguments: ['_dev_id', this.currConfig._dev_id]
                    })
                }
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_hold', 'START']
                })
            } catch (e:any) {
                throw Error(e.message)
            }
        }
    }
}
export default ZzdBuriedPointClass
