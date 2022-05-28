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