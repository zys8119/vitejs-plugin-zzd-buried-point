export interface ZzdBuriedPointTypeInterface<T> {}
export type ZzdBuriedPointType = string;

export type zzdCodeConfig = {
    [key in ZzdBuriedPointType ]:ZzdBuriedPointConfig
} & ZzdBuriedPointTypeInterface<ZzdBuriedPointConfig>

export interface ZzdBuriedPoint {
    currConfig:ZzdBuriedPointConfig;
    type:ZzdBuriedPointType;
    isValidity:boolean;

    /**
     * 浙政钉--基础埋点
     * @param conifg
     */
    createBaseBurialPoint(conifg?:ZzdBuriedPointConfig):void;

    /**
     * 浙政钉--用户信息埋点
     * @param conifg
     */
    createUserInfoBurialPoint(conifg?:ZzdBuriedPointConfig):void;
}

export type ZzdBuriedPointConfig = ZzdBuriedPointAppConfig & Partial<ZzdBuriedPointConfigBase & ZzdBuriedPointConfigUserInfo>;


export type ZzdBuriedPointAppConfig = {
    [key:string]:any;
    appTitle?:string;// 浙政钉应用名称
    //todo 应用配置-稳定性监控
    bid:string;// 平台应用绑定id
    signkey:string;// 应用签名
    gateway?:string;// 应用网关网关, 默认网关为 'zjzwfw.gov.cn'

    //todo 基础埋点
    sapp_id?:string;// 应用id
    sapp_name?:string;// 用用名称

    //todo 用户信息埋点
    _dev_id?:string;// 您的设备 ID
}

//todo 用户信息埋点
export type ZzdBuriedPointConfigUserInfo = {
    _user_nick?:any;// 用户名称
    _user_id?:any;// 用户id
}

//todo 基础埋点
export type ZzdBuriedPointConfigBase = {
    page_id?:string;// 页面id
    page_name?:string;// 页面名称
    page_url?:string;// 页面url
}

export type aplus_queue_push_argumentsType = {
    is_auto: boolean;
    sapp_id:any;
    sapp_name:any;
    page_id:any;
    page_name:any;
    page_url:any;
}

export type aplus_queue_push_arguments = string | Partial<aplus_queue_push_argumentsType>

export type aplus_queue_push_action = 'aplus.setMetaInfo' | 'aplus.sendPV'

export interface aplus_queue_push {
    action:aplus_queue_push_action;
    arguments:aplus_queue_push_arguments[]
}

export interface aplus_queue {
    push(aplus_queue_push:aplus_queue_push):void
}

export class wpkReporterClass {
    constructor(config:Partial<ZzdBuriedPointAppConfig>) {
    }

    installAll():void {}
}

declare global {
    const zzdCode:ZzdBuriedPointType
    const aplus_queue:aplus_queue
    const wpkReporter:typeof wpkReporterClass
    const _wpk:typeof wpkReporterClass
    interface Window {
        _wpk:wpkReporterClass
    }
}
