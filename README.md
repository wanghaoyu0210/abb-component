# rollpu 打包组件库
* 每一个组件实例上挂载install方法
这是为了能够使用
import {LText} from 'abb-component'
app.use(LText)
这种方式单独引入组件
```
import { App } from 'vue'
import LShape from './LShape.vue'
LShape.install = (app: App) => {
  app.component(LShape.name, LShape)
}

export default LShape
```
* 配置入口文件index.ts
这是为了能够使用
import AbbComponent from 'abb-component'
app.use(AbbComponent)
这种方式引入全部组件
```
import {App} from 'vue';
import LText from './components/LText';
import LImage from './components/LImage';
import LShape from './components/LShape';

const components = [
    LText,
    LImage,
    LShape
]

const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    LText,
    LImage,
    LShape,
    install
}

export default {
    install
}
```
* 配置rollup.config.js文件
    依赖的插件
    + @rollup/plugin-json //解析模块中导入*.json文件
    + @rollup/plugin-node-resolve //解析node_modules中绝对路径的引入
    + rollup-plugin-css-only //解析*.vue文件中<style></style>中的内容
    + rollup-plugin-typescript2 //解析*.ts文件
    + rollup-plugin-vue //解析*.vue文件
* tsconfig配置导出*.d.ts文件 
```
compilerOptions: {
    declaration: true
}
```
* 配置package.json文件中的第三方依赖
如果npm install abb-components 的时候发现项目中并没有安装vue包，就会打印warning信息
```
"peerDependencies": {
    "vue": "^3.0.0"
}
```
* rollup.config.json文件中的第三方依赖
打包生成的文件中并没有将引用到的vue, loadsh-es这两个库中的代码融合，而是通过import {} from '' 这种方式饮用，所以想用这个组件库，就必须在项目中安装vue, loadsh-es
```
external: ['vue', 'loadsh-es']
```

* 拆分打包配置文件
对于umd格式的文件需要做单独处理
因为在上一步配置了外部依赖库，所以在倒入的时候需要知道这个外部依赖库的全局变量名
还需要配置这个组件库的全局变量名 
```
output: {
        name: 'ABBComponent',
        file: file('umd'),
        format: 'umd',
        globals: {
            'vue': 'Vue',
            'loadsh-es': '_'
        },
        exports: 'named'
    }
```

* package.json文件内配置
当一个项目安装了这个组件库, 那么就会在import from的时候去找到这个组件库的入口文件
但如果项目使用的是es模块,且组件库package.json配置了module这个属性，那么就会优先引用这个配置的文件
```
  "main": "dist/app-component.umd.js",
  "module": "dist/app-component.esm.js",
  "types": "dist/index.d.ts"

```

