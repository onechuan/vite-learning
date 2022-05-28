## 深入浅出vite 学习笔记

### 从零搭建项目

一个 import 语句代表一个 HTTP 请求

### 

### Lint工具链保证代码质量和风哥
yarn add eslint -D
npx eslint --init

```js
// .prettierrc.js
module.exports = {
    printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
    useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
    semi: true, // 行尾是否使用分号，默认为true
    trailingComma: "none", // 是否使用尾逗号
    bracketSpacing: true // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
  };
```

其中eslint-config-prettier用来覆盖 ESLint 本身的规则配置，而eslint-plugin-prettier则是用于让 Prettier 来接管eslint --fix即修复代码的能力。

Stylelint，一个强大的现代化样式 Lint 工具，用来帮助你避免语法错误和统一代码风格。


#### commitlintrc

commitlint 是对提交git时的commit信息进行校验

```
// type 指提交的类型
// subject 指提交的摘要信息
<type>: <subject>
常用的 type 值包括如下:

feat: 添加新功能。
fix: 修复 Bug。
chore: 一些不影响功能的更改。
docs: 专指文档的修改。
perf: 性能方面的优化。
refactor: 代码重构。
test: 添加一些测试代码等等。
```

#### 小结

- JavaScript/TypeScript 规范。主流的 Lint 工具包括 Eslint、Prettier；
- 样式开发规范。主流的 Lint 工具包括Stylelint、Prettier；
- Git 提交规范。主流的 Lint 工具包括Commitlint。


### 静态资源处理

- 图片
  - 内联资源：对代码体积的影响较小，可以减少不必要的网络请求，优化网络性能
  - 单独打包：体积比较大的资源适合单独打包成一个文件，否则会导致上MB的base64字符串内嵌到代码中，导致体积庞大，页面加载性能下降

- Vite 中内置的优化方案是下面这样的:
  - 如果静态资源体积 >= 4KB，则提取成单独的文件
  - 如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联

注意：svg 格式的文件不受这个临时值的影响，始终会打包成单独的文件，因为它和普通格式的图片不一样，需要动态设置一些属性

图片压缩工具：imagemin

- 雪碧图优化
在实际的项目中我们还会经常用到各种各样的 svg 图标，虽然 svg 文件一般体积不大，但 Vite 中对于 svg 文件会始终打包成单文件，大量的图标引入之后会导致网络请求增加，大量的 HTTP 请求会导致网络解析耗时变长，页面加载性能直接受到影响。

HTTP2 的多路复用设计可以解决大量 HTTP 的请求导致的网络加载性能问题，因此雪碧图技术在 HTTP2 并没有明显的优化效果，这个技术更适合在传统的 HTTP 1.1 场景下使用(比如本地的 Dev Server)。

vite-plugin-svg-icons