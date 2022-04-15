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
    new ZzdBuriedPoint($zzdCode).createBaseBurialPoint({
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
new ZzdBuriedPoint($zzdCode).createUserInfoBurialPoint({
    _user_nick:'用户名称',
    _user_id:'用户id',
})
//todo <!--【结束】==========浙政钉埋点用户信息，禁止删除=======-->
```
