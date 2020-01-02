import React, { FC } from "react"
import Helmet from "react-helmet"
import withDefaultProps from "../../Utils/DefaultPropsUtil"
import useSiteMeta from "../../Utils/SiteMeta"

type LangSpec = "zh" | "en";
type TypeSpec = "article" | "website";
type KwdType = string | string[];

// default props
const defaultProps = {
    keywords: "" as KwdType,
    lang: "zh" as LangSpec,
    type: "article" as TypeSpec,
}
type DefaultProps = Readonly<typeof defaultProps>;
type ISEOData = {
    description?: string,
    title?: string,
    location: Location
} & DefaultProps;


function isString(x: any): x is string {
    return typeof x === "string"
}

const SEO_: FC<ISEOData> = (props) => {

    // functions
    const stringOrDefault = (x: Maybe<string>) => {
        if (isString(x)) {
            return x as string
        } else {
            return ""
        }
    }

    // data
    const { description, keywords, lang, type, title, location } = props
    const siteMetadata = useSiteMeta()
    const siteName = siteMetadata?.siteName
    const author = siteMetadata?.author
    // tslint:disable-next-line:variable-name
    const _des = description ? description : siteMetadata?.description
    const metaDescription: string = stringOrDefault(_des)
    let kwd: string = isString(keywords) ? keywords : keywords.join(",")
    kwd += siteMetadata?.keyWords as string

    return (
        <Helmet
            htmlAttributes={
                { lang }
            }
            defaultTitle={`${siteName}`}
            titleTemplate={`%s | ${siteName}`}
        >
            <title>{title}</title>
            <link rel={"canonical"} href={location.href}/>
            {/*classic*/}
            <meta name={"description"} content={metaDescription}/>
            <meta name={"author"} content={author as string}/>
            <meta name={"keywords"} content={kwd}/>
            <meta charSet="UTF-8"/>
            {/*ogp*/}
            <meta property={"og:description"} content={metaDescription}/>
            <meta property={"og:title"} content={title}/>
            <meta property={"og:locale"} content={lang}/>
            <meta property={"og:type"} content={type}/>
            <meta property={"og:site_name"} content={siteName as string}/>
        </Helmet>
    )
}

const SEO = withDefaultProps(
    defaultProps,
    SEO_,
)

export default SEO
