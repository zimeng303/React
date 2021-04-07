@[TOC](React UI组件库)

## 流行的开源 React UI组件库

## material-ui（国外）

* 1，官网：[http://www.material-ui.com/#/](http://www.material-ui.com/#/)
* 2，Github：[https://github.com/callemall/material-ui](https://github.com/callemall/material-ui)

## ant-design（国内蚂蚁金服）

* 1，官网：[https://ant.design/index-cn](https://ant.design/index-cn)
* 2，Github：[https://github.com/ant-design/ant-design/](https://github.com/ant-design/ant-design/)

# antd 的按需引入 + 自定主题

* 1，安装依赖：

  ```powershell
  yarn add react-app-rewired customize-cra babel-plugin-import less less-loader@5.0.0
  ```

  > <font color="#f00">注意：</font>
  >
  > 指定 `less-loader` 的版本，否则可能会因 `less-loader` 版本过高，报错。

* 2，修改 `package.json`

  ```json
  {
      "scripts": {
          "start": "react-app-rewired start",
          "build": "react-app-rewired build",
          "test": "react-app-rewired test",
          "eject": "react-scripts eject"
      },
  }
  ```

* 3，根目录下创建 `config-overrides.js`

  ```js
  //配置具体的修改规则
  const { override, fixBabelImports,addLessLoader} = require('customize-cra');
  module.exports = override(
      fixBabelImports('import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
      }),
      addLessLoader({
          lessOptions:{
              javascriptEnabled: true,
              modifyVars: { '@primary-color': 'green' },
          }
      }),
  );
  ```

* 4，备注：
  * 不用在组件里亲自引入样式了，即：`import 'antd/dist/antd.css'` 应该删掉

