/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-syntax */
import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
    const processHeadComp = (headComponents) => {
        if (process.env.NODE_ENV === "production") {
            for (const component of headComponents) {
                if (component.type === "style") {
                    const index = headComponents.indexOf(component);
                    const link = (
                        <link
                            rel="stylesheet"
                            href={component.props["data-href"]}
                        />
                    );
                    headComponents.splice(index, 1, link);
                }
            }
        }
    };

    const {
        headComponents,
        htmlAttributes,
        bodyAttributes,
        preBodyComponents,
        body,
        postBodyComponents,
    } = props;

    processHeadComp(headComponents);

    return (
        <html lang="zh-CN" {...htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                {headComponents}
            </head>
            <body {...bodyAttributes}>
                {preBodyComponents}
                <div
                    key="body"
                    id="___gatsby"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: body }}
                />
                {postBodyComponents}
            </body>
        </html>
    );
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object.isRequired,
    headComponents: PropTypes.array.isRequired,
    bodyAttributes: PropTypes.object.isRequired,
    preBodyComponents: PropTypes.array.isRequired,
    body: PropTypes.string.isRequired,
    postBodyComponents: PropTypes.array.isRequired,
};
