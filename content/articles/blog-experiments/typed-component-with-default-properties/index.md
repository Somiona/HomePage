---
title: Gatsby踩坑记 2.给React Component @ Typescript添加默认参数的正确姿势
date: 2019-12-31T16:41:15-05:00
keyWords: Typescript,Reactjs,Component,默认参数,default Props
series: Typescript,Reactjs,Gatsby踩坑记
---

利用Typescript的类型系统，可以写出更好的、tslint友好的默认参数。

## 核心代码:

```typescript
//DefaultPropsUtil.tsx
import React from "react"

const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
    defaultProps: DP,
    Cmp: React.ComponentType<P>
) => {
    type RequiredProps = Omit<P, keyof DP>
    type Props = Partial<DP> & RequiredProps
    Cmp.defaultProps = defaultProps
    return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>
}

export default withDefaultProps

```

这段代码可以通过传入的默认参数，给component对应的参数位设置为字面值类型。

##使用方法

1. 定义`defaultProps`的值:
    ```typescript
    const defaultProps = {
        hide: true    
    };
    ```
2. 定义component的props类型:
    ```typescript
    type IExample = {
        motd: string
    } & Readonly<typeof defaultProps>;
    ```
    注意这里要用type而不是interface。
3. 定义component，这个不是直接用来导出的。这里用functional component作为例子:
    ```typescript
    import React, {FC} from "react";
    
    const TExample: FC<IExample> = (props) => {
        return (
            <div style={props.hide ? {display: "none"} : {}}>
                <p>{props.motd}</p>
            </div>
        );
    };
    ```
4. 最后调用withDefaultProps, 并且export
    ```typescript
    import withDefaultProps from "./DefaultPropsUtil"
    const Example = withDefaultProps(
        defaultProps,
        TExample
    );
    export default Example;
    ```

## 更复杂的例子:

这个博客的SEO部分使用了这个方法:

```typescript
// SEO.tsx
import React, { FC } from "react";
import withDefaultProps from "./DefaultPropsUtil";

type LangSpec = "zh" | "en";
type TypeSpec = "article" | "website";
type KwdType = string | string[];

// default props
const defaultProps = {
    keywords: "" as KwdType,
    lang: "zh" as LangSpec,
    type: "article" as TypeSpec,
};
type DefaultProps = Readonly<typeof defaultProps>;
type ISEOData = {
    description?: string,
    title?: string,
    location: Location
} & DefaultProps;

const SEO_: FC<ISEOData> = (props) => {
    // do whatever you want
}

const SEO = withDefaultProps(
    defaultProps,
    SEO_,
)

export default SEO;
```
