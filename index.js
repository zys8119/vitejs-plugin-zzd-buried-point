"use strict";
exports.__esModule = true;
var vite_1 = require("vite");
var fs_1 = require("fs");
var path_1 = require("path");
var htmlTransform_1 = require("./htmlTransform");
var VITE_ZZD_CODE = null;
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
            html = (0, htmlTransform_1["default"])(html, VITE_ZZD_CODE || null);
            //todo <!--【结束】==========浙政钉埋点html模板信息注入，禁止删除=======-->
            return html;
        },
        config: function (config, env) {
            //todo  浙政钉埋点 code 禁止删除==================
            // const aa = fs_1.readFileSync((0, path_1.resolve)(process.cwd(), ".env.".concat(env.mode)),"utf-8")
            // console.log((aa.match(/VITE_ZZD_CODE=(.*)/) || [])[1])
            // envObj = loadEnv(env.mode, resolve(process.cwd(),`.env.${env.mode}`)) as any
            var envPath = (0, path_1.resolve)(process.cwd(), ".env.".concat(env.mode));
            if ((0, fs_1.existsSync)(envPath)) {
                VITE_ZZD_CODE = (0, fs_1.readFileSync)(envPath, "utf-8");
                VITE_ZZD_CODE = (VITE_ZZD_CODE.match(/VITE_ZZD_CODE=(.*)/img) || [])[1];
            }
            return (0, vite_1.mergeConfig)(config, {
                define: {
                    $zzdCode: JSON.stringify(VITE_ZZD_CODE || null)
                }
            });
            //todo  浙政钉埋点 code 禁止删除==================
        }
    };
});
