"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var ZzdBuriedPointClass = /** @class */ (function () {
    function ZzdBuriedPointClass(type) {
        this.type = type;
        this.currConfig = {};
        this.isValidity = true;
        if (Object.prototype.toString.call(type) === '[object String]') {
            if (config_1["default"][type]) {
                this.currConfig = config_1["default"][type];
                this.isValidity = true;
            }
            else {
                throw Error("\u8BF7\u5148\u81F3vite.config\u63D2\u4EF6\u9009\u9879\u914D\u7F6E\u3010vitejs-plugin-zzd-buried-point\u3011\u914D\u7F6E\u7C7B\u578B\u4E3A\u3010".concat(type, "\u3011\u7684\u6D59\u653F\u9489\u76F8\u5173\u914D\u7F6E\u4FE1\u606F\uFF0C\u518D\u91CD\u542F\u9879\u76EE\u3002"));
            }
        }
        else {
            this.isValidity = false;
        }
    }
    /**
     * 浙政钉--基础埋点
     */
    ZzdBuriedPointClass.prototype.createBaseBurialPoint = function (config) {
        if (config === void 0) { config = {}; }
        if (this.isValidity) {
            try {
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['aplus-waiting', 'MAN']
                });
                aplus_queue.push({
                    action: 'aplus.sendPV',
                    arguments: [{
                            is_auto: false
                        }, {
                            sapp_id: this.currConfig.sapp_id,
                            sapp_name: this.currConfig.sapp_name,
                            page_id: config.page_id,
                            page_name: config.page_name,
                            page_url: config.page_url
                        }]
                });
            }
            catch (e) {
                throw Error(e.message);
            }
        }
    };
    /**
     * 浙政钉--用户信息埋点
     * @param conifg
     */
    ZzdBuriedPointClass.prototype.createUserInfoBurialPoint = function (config) {
        if (config === void 0) { config = {}; }
        if (this.isValidity) {
            try {
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_hold', 'BLOCK']
                });
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_user_nick', config._user_nick]
                });
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_user_id', config._user_id]
                });
                if (this.currConfig._dev_id) {
                    aplus_queue.push({
                        action: 'aplus.setMetaInfo',
                        arguments: ['_dev_id', this.currConfig._dev_id]
                    });
                }
                aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['_hold', 'START']
                });
            }
            catch (e) {
                throw Error(e.message);
            }
        }
    };
    return ZzdBuriedPointClass;
}());
exports["default"] = ZzdBuriedPointClass;
