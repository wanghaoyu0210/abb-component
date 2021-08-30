# 组件开发流程

## 编写组件内容

## 将组件配置为vue插件
```
import {App} from 'vue';
import LText from './LText.vue';

LText.install = (app: App) => {
    app.component(LText.name, LText)
}

export default LText
```

## 配置所有组件的入口文件
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

## 配置rollup.config.js文件
*   依赖的插件
*   + @rollup/plugin-json //解析模块中导入*.json文件
*   + @rollup/plugin-node-resolve //解析node_modules中绝对路径的引入
*   + rollup-plugin-css-only //解析*.vue文件中<style></style>中的内容
*   + rollup-plugin-typescript2 //解析*.ts文件
*   + rollup-plugin-vue //解析*.vue文件

## 配置package.json
* private
```
"private": false
```
* script
```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "npm run clean && npm run build:esm && npm run build:umd",
    "test:watch": "vue-cli-service test:unit --watch",
    "test": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint --max-warnnings 5",
    "build:esm": "npx rollup --config ./src/rollup.esm.config.js",
    "build:umd": "npx rollup --config ./src/rollup.umd.config.js",
    "clean": "rimraf ./dist",
    "prepublishOnly": "npm run lint && npm run test && npm run build"
}
```
* peerDependencies
```
"peerDependencies": {
    "vue": "^3.0.0"
}
```
* main
```
"main": "dist/abb-component.umd.js"
```
* module
```
"module": "dist/abb-component.esm.js",
```
* files
```
"files": [
    "dist"
]
```
* pre-commit
```
"husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test"
    }
}
```

## 配置.travis.yml文件，CI/CD


