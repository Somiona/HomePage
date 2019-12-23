import React, { FC } from "react"
import Helmet from "react-helmet"
import useSiteMeta from "../Utils/SiteMeta"
import withDefaultProps from "../Utils/DefaultPropsUtil"

type LangSpec = "zh" | "en"
type TypeSpec = "article" | "website"
type KwdType = string | string[]

//default props
type DefaultProps = Readonly<typeof defaultProps>
type ISEOData = {
    description?: string,
    title?: string,
    location: Location
} & DefaultProps
const defaultProps = {
    lang: "zh" as LangSpec,
    type: "article" as TypeSpec,
    keywords: "" as KwdType,
}

function isString(x: any): x is string {
    return typeof x === "string"
}

const SEO_: FC<ISEOData> = (props) => {

    //functions
    const stringOrDefault = (x: Maybe<string>) => {
        if (isString(x)) {
            return x as string
        } else {
            return ""
        }
    }

    //data
    const { description, keywords, lang, type, title, location } = props
    const siteMetadata = useSiteMeta()
    const siteName = siteMetadata?.siteName
    const author = siteMetadata?.author
    const metaDescription: string = stringOrDefault(description || siteMetadata!.description)
    const kwd: string = isString(keywords) ? keywords : keywords.join(",")

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
