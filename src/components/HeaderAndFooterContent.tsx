import React, { FC } from "react"
import useSiteMeta from "../Utils/SiteMeta"

export const HeaderTitle: FC<{}> = () => {
    const siteMetadata = useSiteMeta()

    return (
        <>
            <span className={"header-title"}>{siteMetadata?.siteName as string}</span>
            <span className={"header-author"}>{siteMetadata?.author as string}</span>
        </>
    )
}

export const FooterContent: FC<{}> = () => {
    const siteMetadata = useSiteMeta()
    const thisYear = new Date().getFullYear()
    const year = `${thisYear - 1} - ${thisYear}`
    return (
        <>
            <div>
                {`© ${year} ${siteMetadata?.author} `}
            </div>
            <div>
                Powered by <b><a href="https://www.gatsbyjs.org">Gatsby</a></b>
            </div>
        </>
    )
}
