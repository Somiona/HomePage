---
title: Gatsby踩坑 1.配置Bootstrap4以及SCSS
date: 2019-12-29T20:27:49-05:00
keyWords: Gatsby,remove inline css,purge css,customize
series: Gatsby踩坑记
---

> 最近懒得手写大量的 css, 准备用上 Bootstrap 偷懒一下。然而 bootstrap 的体积很大,
> 会显著的增加网站的数据量。同时, 因为 gatsby 会将所有的 css 处理成 inline 形式放置在`<head>`标签里
> 以尝试优化性能([see here](https://github.com/gatsbyjs/gatsby/issues/2289#issuecomment-333407589)),
> 这会让页面加载速度在网络不好的情况下略卡。

Bootstrap4 官方支持用 scss 来自定义样式, 所以为了能使用这个功能, 先配置一下 scss。

## 配置 SCSS

gatsby 社区有一个“drop to work”的插件可以用, 直接安装后便可以将 scss 文件直接当成 css 文件来使用。

```bash
yarn add gatsby-plugin-sass
yarn add -D node-sass
```

然后修改`gatsby-config.js`, 添加下面一段。注意, 为了避免 bug, 这个插件请尽可能放在前面。

```javascript
module.exports = {
    plugins: [
        //sass支持, 其他例如purgecss、remark之类的插件一定要在这个之后加载
        "gatsby-plugin-sass",
    ],
}
```

## 配置 Bootstrap4

Bootstrap 默认使用`jQuery`处理页面元素, 但既然使用了 gatsby, 不如直接使用`ReactJS`来处理。所以安装
Bootstrap, 以及 react-bootstrap。同时, 因为 Bootstrap 的体积过大, 可以安装 gatsby-plugin-purgecss 来去除
多余的 selectors。

```bash
yarn add bootstrap4 react-bootstrap gatsby-plugin-purgecss
```

先配置一下 purgecss, 这里可以参考一下[官方文档](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/?=purge#content---from-purgecss),
修改`gatsby-config.js`:

```javascript
//在`cssWhiteList`里添加想要忽略的selector
const cssWhiteList = ["fixed-top", "collapsed", "container", "collapse"]
const cssWhitePattern = [/^nav/, /^bg-/]

module.exports = {
    plugins: [
        {
            resolve: "gatsby-plugin-purgecss",
            options: {
                printRejected: true, // Print removed selectors and processed file names
                //gatsby develop的时候仍然启用, 这个可以帮助测试whitelist
                develop: true, // Enable while using "gatsby develop"
                // tailwind: true, // Enable tailwindcss support
                whitelist: cssWhiteList, // Don't remove this selector
                whitelistPatterns: cssWhitePattern,
                ignore: ["prismjs/", "docsearch.js/"], // Ignore files/folders
                // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
            },
        },
    ],
}
```

然后在 src 里创建一个 styles 文件夹, 新建`_custom_vars.scss`以及`bootstrap4_custom.scss`
其中, optional 段可以根据需要来 import, 而自定义的 variables 要放在 custom_vars。能够修改的变量可以看
`node_modules/bootstrap/scss/_variables.scss`这个文件, 注意, 我们不能在 import 对应的文件之前引用变量。

```scss
//bootstrap4_custom.scss
@import "custom_vars";

//custom bootstrap4 theme. See https://getbootstrap.com/docs/4.3/getting-started/theming/
// Required
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins";
// Optional
@import "node_modules/bootstrap/scss/root";
@import "node_modules/bootstrap/scss/reboot";
@import "node_modules/bootstrap/scss/type";
@import "node_modules/bootstrap/scss/images";
@import "node_modules/bootstrap/scss/code";
@import "node_modules/bootstrap/scss/grid";
@import "node_modules/bootstrap/scss/tables";
@import "node_modules/bootstrap/scss/forms";
@import "node_modules/bootstrap/scss/buttons";
@import "node_modules/bootstrap/scss/transitions";
@import "node_modules/bootstrap/scss/dropdown";
@import "node_modules/bootstrap/scss/button-group";
@import "node_modules/bootstrap/scss/input-group";
@import "node_modules/bootstrap/scss/custom-forms";
@import "node_modules/bootstrap/scss/nav";
@import "node_modules/bootstrap/scss/navbar";
@import "node_modules/bootstrap/scss/card";
@import "node_modules/bootstrap/scss/breadcrumb";
@import "node_modules/bootstrap/scss/pagination";
@import "node_modules/bootstrap/scss/badge";
@import "node_modules/bootstrap/scss/jumbotron";
@import "node_modules/bootstrap/scss/alert";
@import "node_modules/bootstrap/scss/progress";
@import "node_modules/bootstrap/scss/media";
@import "node_modules/bootstrap/scss/list-group";
@import "node_modules/bootstrap/scss/close";
@import "node_modules/bootstrap/scss/toasts";
@import "node_modules/bootstrap/scss/modal";
@import "node_modules/bootstrap/scss/tooltip";
@import "node_modules/bootstrap/scss/popover";
@import "node_modules/bootstrap/scss/carousel";
@import "node_modules/bootstrap/scss/spinners";
@import "node_modules/bootstrap/scss/utilities";
@import "node_modules/bootstrap/scss/print";
```

然后在项目根目录创建`gatsby-browser.js`, 把刚刚创建的 scss 作为全局样式。

```javascript
import "./src/styles/bootstrap4_custom.scss"
```

到这里, 就可以愉快的使用 Bootstrap 啦, react-bootstrap 提供了很多 component 可以用来解放双手, 例如:

```typescript jsx
import React from "react"
//官方推荐直接从对应的submodule import
import Navbar from "react-bootstrap/Navbar"
const Comp = props => {
    return <Navbar>{/*other code*/}</Navbar>
}
```

注意, purgecss 的工作原理是检查源代码里的 className property, 这个和 react-bootstrap 的实现方式有些冲突。
所以为了避免对应的样式被清理掉, 一定要在 gatsby-config 里设置好 whitelist。

## 更改 Gatsby 默认 css 行为

如果看过 gatsby 生成的网页, 会发现每个页面都有重复的 inline css。可以通过[自定义 html.js](https://www.gatsbyjs.org/docs/custom-html/)来更改这个行为:

1. 从.cache 文件夹下复制`default-html.js` 到 src 文件夹下
2. 重命名为`html.js`
3. 修改代码 ([感谢 Glinkis 的思路](https://github.com/gatsbyjs/gatsby/issues/2289#issuecomment-517276598))：

    ```typescript jsx
    //上面不动
    export default function HTML(props) {
        const processHeadComp = headComponents => {
            if (process.env.NODE_ENV === "production") {
                for (const component of headComponents) {
                    if (component.type === "style") {
                        const index = headComponents.indexOf(component)
                        const link = <link rel={"stylesheet"} href={component.props["data-href"]} />
                        headComponents.splice(index, 1, link)
                    }
                }
            }
        }

        processHeadComp(props.headComponents)

        return //下面保留原有代码不变
    }
    ```

这样, 在 production 环境下生成的 html 就会自动引用 sass 生成的 css 文件啦。
