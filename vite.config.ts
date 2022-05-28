import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式

import * as path from 'path';

// 处理浏览器兼容前缀
import autoprefixer from 'autoprefixer';

import viteEslint from 'vite-plugin-eslint';

import viteStylelint from '@amatlash/vite-plugin-stylelint';

// svg
import svgr from 'vite-plugin-svgr';

// 图片体积压缩
import viteImagemin from 'vite-plugin-imagemin';

// 雪碧图优化
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'https://sanyuan.cos.ap-beijing.myqcloud.com';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/assets/css/variable.scss')
);

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  // 手动指定项目根目录位置
  root: path.join(__dirname, 'src'),
  plugins: [
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          'babel-plugin-styled-components'
          // 适配 emotion
          // "@emotion/babel-plugin"
        ]
      }

      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      // jsxImportSource: "@emotion/react"
    }),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    }),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/svg')]
    })
  ],
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  json: {
    stringify: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/')
    }
  },
  build: {
    // 8 KB
    assetsInlineLimit: 8 * 1024
  }
});
