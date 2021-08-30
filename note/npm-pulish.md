# npm publish
## npm login登陆
## package.json配置
* "private": false 
* "files": ["dist"] // 发布的时候上传哪些文件
* "peerDependencies": {"vue": "^3.0.0"} // 外部依赖
* script: { "prepublishOnly": "npm run build" } // 确保npm publish的是最新的dist文件

## 发布前的准备
* 检查eslint---npm run lint 
* 单元测试---npm run test
* rollup打包---npm run build

## 安装husky运行git生命周期
```
npm install husky@4 -D

// package.json 配置下面这段代码
"husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test"
    }
}
```

## Travis ci 配置
ci 持续集成
* 使用github账户登陆travis ci
* 配置.travis.yml文件
* 本地代码修改之后git push就会出发travis自动测试构建

## Travis cd 配置
cd 持续部署
```
deploy:
  provider: npm
  email: m15615230270_2@163.com
  api_key: fce04757-8149-44e1-96db-fad59cb75e44
  on: 
    tags: true
```
* cat ~/.npmrc 查看npm token
* sudo gem install travis 安装travis工具
* travis encrypt --pro fce04757-8149-44e1-96db-fad59cb75e44 --add deploy.api_key 这一步对npm token 加密
* git tag -a v.1.0.2 -m "version 1.0.2"
* git push --tags
