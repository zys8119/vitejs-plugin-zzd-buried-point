# vitejs-plugin-zzd-buried-point

vite 浙政钉埋点插件

## 安装

```shell
npm i vitejs-plugin-zzd-buried-point --save-dev
```

## 使用指南

### vite 插件注入

1、vite.config.ts

```typescript
import {defineConfig} from "vite"
import ZzdBuriedPoint from 'vitejs-plugin-zzd-buried-point'

export default defineConfig({
    plugins:[
        ZzdBuriedPoint({
            zzdTestCode:{
                appTitle: '测试应用名称',
                bid: '平台应用绑定id',
                signkey: '应用签名',
                sapp_id: '应用id',
                sapp_name: '用用名称',
            },
            // .....可以配置更多应用信息
        }),
    ]
})
```

### 基础信息埋点

2、vue-router 

```typescript
import ZzdBuriedPoint from 'vitejs-plugin-zzd-buried-point/ZzdBuriedPoint'
router.beforeEach(async(to, from, next) => {
    //todo <!--【开始】==========浙政钉埋点基础信息，禁止删除=======-->
    new ZzdBuriedPoint(zzdCode).createBaseBurialPoint({
        page_id: to.fullPath,
        page_name: to.name as any,
        page_url: to.path,
    })
    //todo <!--【结束】==========浙政钉埋点基础信息，禁止删除=======-->
})
```

### 基础信息埋点

3、项目登陆页面 

```typescript
import ZzdBuriedPoint from 'vitejs-plugin-zzd-buried-point/ZzdBuriedPoint'
//todo <!--【开始】==========浙政钉埋点用户信息，禁止删除=======-->
new ZzdBuriedPoint(zzdCode).createUserInfoBurialPoint({
    _user_nick:'用户名称',
    _user_id:'用户id',
})
//todo <!--【结束】==========浙政钉埋点用户信息，禁止删除=======-->
```

### 稳定性监控、通用采集

3、index.html添加以下注释

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <!--【开始】==========浙政钉埋点html信息，禁止删除=======-->
    <!--${zzdHtml}-->
    <!--【结束】==========浙政钉埋点html信息，禁止删除=======-->
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```


### 使用配置

> 请在对应的开发模式下的环境变量设置对应的浙政钉埋点code

例如：开发模式下，则在 `.env.production` 文件中加入以下代码， 建议在生产模式加即`.env.production`文件
```shell
# 浙政钉埋点code
VITE_ZZD_CODE=zzdTestCode

# 你的其他环境配置
# ....
```
