---
title: Gatsby踩坑 1.配置Bootstrap4以及SCSS
date: 2019-12-29T20:27:49-05:00
keyWords: Gatsby,remove inline css,purge css,customize
series: Gatsby踩坑记
---

>最近懒得手写大量的css, 准备用上Bootstrap偷懒一下。然而bootstrap的体积很大, 
>会显著的增加网站的数据量。同时, 因为gatsby会将所有的css处理成inline形式放置在`<head>`标签里
>以尝试优化性能([see here](https://github.com/gatsbyjs/gatsby/issues/2289#issuecomment-333407589)),
>这会让页面加载速度在网络不好的情况下略卡。

Bootstrap4官方支持用scss来自定义样式, 所以为了能使用这个功能, 先配置一下scss。

## 配置SCSS

gatsby社区有一个“drop to work”的插件可以用, 直接安装后便可以将scss文件直接当成css文件来使用。
```bash
yarn add gatsby-plugin-sass
yarn add -D node-sass
```
然后修改`gatsby-config.js`, 添加下面一段。注意, 为了避免bug, 这个插件请尽可能放在前面。
```javascript
module.exports = { 
    plugins: [
        //sass支持, 其他例如purgecss、remark之类的插件一定要在这个之后加载
        "gatsby-plugin-sass",
    ]
};
```

## 配置 Bootstrap4

Bootstrap默认使用`jQuery`处理页面元素, 但既然使用了gatsby, 不如直接使用`ReactJS`来处理。所以安装
Bootstrap, 以及react-bootstrap。同时, 因为Bootstrap的体积过大, 可以安装gatsby-plugin-purgecss来去除
多余的selectors。

```bash
yarn add bootstrap4 react-bootstrap gatsby-plugin-purgecss
```

先配置一下purgecss, 这里可以参考一下[官方文档](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/?=purge#content---from-purgecss),
修改`gatsby-config.js`:

```javascript
//在`cssWhiteList`里添加想要忽略的selector
const cssWhiteList = ["fixed-top", "collapsed", "container", "collapse"];
const cssWhitePattern = [/^nav/, /^bg-/];

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
        }
    ]
};
```

然后在src里创建一个styles文件夹, 新建`_custom_vars.scss`以及`bootstrap4_custom.scss`
其中, optional段可以根据需要来import, 而自定义的variables要放在custom_vars。能够修改的变量可以看
`node_modules/bootstrap/scss/_variables.scss`这个文件, 注意, 我们不能在import对应的文件之前引用变量。

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

然后在项目根目录创建`gatsby-browser.js`, 把刚刚创建的scss作为全局样式。

```javascript
import "./src/styles/bootstrap4_custom.scss"
```

到这里, 就可以愉快的使用Bootstrap啦, react-bootstrap提供了很多component可以用来解放双手, 例如: 

```typescript jsx
import React from "react"
//官方推荐直接从对应的submodule import
import Navbar from "react-bootstrap/Navbar"
const Comp = (props) => {
    return (
        <Navbar>
            {/*other code*/}
        </Navbar>
    )
};
```

注意, purgecss的工作原理是检查源代码里的className property, 这个和react-bootstrap的实现方式有些冲突。
所以为了避免对应的样式被清理掉, 一定要在gatsby-config里设置好whitelist。

## 更改Gatsby默认css行为

如果看过gatsby生成的网页, 会发现每个页面都有重复的inline css。可以通过[自定义html.js](https://www.gatsbyjs.org/docs/custom-html/)来更改这个行为:
1. 从.cache文件夹下复制`default-html.js` 到src文件夹下
2. 重命名为`html.js`
3. 修改代码 ([感谢Glinkis的思路](https://github.com/gatsbyjs/gatsby/issues/2289#issuecomment-517276598))：
    ```typescript jsx
    //上面不动
    export default function HTML(props) {
        const processHeadComp = (headComponents) => {
            if (process.env.NODE_ENV === "production") {
                for (const component of headComponents) {
                    if (component.type === "style") {
                        const index = headComponents.indexOf(component)
                        const link = <link rel={"stylesheet"} href={component.props["data-href"]}/>
                        headComponents.splice(index, 1, link)
                    }
                }
            }
        }
    
        processHeadComp(props.headComponents)
    
        return //下面保留原有代码不变
    }
    ```

这样, 在production环境下生成的html就会自动引用sass生成的css文件啦。
