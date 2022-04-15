import {ConfigEnv, Plugin, UserConfig, mergeConfig, loadEnv} from 'vite'
import {writeFileSync, readFileSync} from 'fs'
import {resolve} from 'path'
import zzdHtmlTransform from './htmlTransform'
import {zzdCodeConfig} from './type'
let envObj = {} as {
    [key:string]:any;
    VITE_ZZD_CODE:any
}
export default (config:zzdCodeConfig) => {
    const configPath = resolve(__dirname,'config.ts')
    const configTmpPath = resolve(__dirname,'config_tmp.ts')
    const newConfigStr = readFileSync(configTmpPath,'utf-8')
        .replace(/\{\}$/img,JSON.stringify(config || {}, null, 4))
    writeFileSync(configPath, newConfigStr)
    return <Plugin>{
        name: 'ZzdBuriedPoint-html-transform',
        transformIndexHtml(html: string) {
            //todo <!--【开始】==========浙政钉埋点html模板信息注入，禁止删除=======-->
            html = zzdHtmlTransform(html, envObj.VITE_ZZD_CODE || null) as any
            //todo <!--【结束】==========浙政钉埋点html模板信息注入，禁止删除=======-->
            return html
        },
        config(config: UserConfig, env: ConfigEnv) {
            //todo  浙政钉埋点 code 禁止删除==================
            envObj = loadEnv(env.mode, resolve(process.cwd(),`.env.${env.mode}`)) as any
            return mergeConfig(config,<UserConfig>{
                define:{
                    $zzdCode:JSON.stringify(envObj.VITE_ZZD_CODE || null)
                },
            })
            //todo  浙政钉埋点 code 禁止删除==================
        }
    }
}
