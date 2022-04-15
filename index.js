"use strict";
exports.__esModule = true;
var vite_1 = require("vite");
var fs_1 = require("fs");
var path_1 = require("path");
var htmlTransform_1 = require("./htmlTransform");
var envObj = {};
exports["default"] = (function (config) {
    var configPath = (0, path_1.resolve)(__dirname, 'config.ts');
    var configTmpPath = (0, path_1.resolve)(__dirname, 'config_tmp.ts');
    var newConfigStr = (0, fs_1.readFileSync)(configTmpPath, 'utf-8')
        .replace(/\{\}$/img, JSON.stringify(config || {}, null, 4));
    (0, fs_1.writeFileSync)(configPath, newConfigStr);
    return {
        name: 'ZzdBuriedPoint-html-transform',
        transformIndexHtml: function (html) {
            //todo <!--【开始】==========浙政钉埋点html模板信息注入，禁止删除=======-->
            html = (0, htmlTransform_1["default"])(html, envObj.VITE_ZZD_CODE || null);
            //todo <!--【结束】==========浙政钉埋点html模板信息注入，禁止删除=======-->
            return html;
        },
        config: function (config, env) {
            //todo  浙政钉埋点 code 禁止删除==================
            envObj = (0, vite_1.loadEnv)(env.mode, (0, path_1.resolve)(process.cwd(), ".env.".concat(env.mode)));
            return (0, vite_1.mergeConfig)(config, {
                define: {
                    $zzdCode: JSON.stringify(envObj.VITE_ZZD_CODE || null)
                }
            });
            //todo  浙政钉埋点 code 禁止删除==================
        }
    };
});
