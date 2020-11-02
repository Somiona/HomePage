import React, { FC, ReactNode } from "react";

enum HtmlTitleLevel {
    H1 = 1,
    H2,
    H3,
    H4,
    H5,
    H6,
}

interface IHn {
    children: ReactNode;
    type: HtmlTitleLevel;
}

const Hn: FC<IHn> = (props) => {
    switch (props.type) {
        case HtmlTitleLevel.H1:
            return <h1>{props.children}</h1>;
        case HtmlTitleLevel.H2:
            return <h2>{props.children}</h2>;
        case HtmlTitleLevel.H3:
            return <h3>{props.children}</h3>;
        case HtmlTitleLevel.H4:
            return <h4>{props.children}</h4>;
        case HtmlTitleLevel.H5:
            return <h5>{props.children}</h5>;
        case HtmlTitleLevel.H6:
            return <h6>{props.children}</h6>;
        default:
            return <div>{props.children}</div>;
    }
};

export { Hn, HtmlTitleLevel };
