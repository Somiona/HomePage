import React, { FC, ReactNode } from "react"
import useSiteMeta from "../Utils/SiteMeta"


interface IFooterProps {
    children?: ReactNode;
}


const Footer: FC<IFooterProps> = ({}) => {
    const siteMetadata = useSiteMeta()
    const thisYear = new Date().getFullYear()
    const year = `${thisYear - 1} - ${thisYear}`

    return (
        <footer>
            <div className={"text-center"}>
                <div>
                    {`© ${year} ${siteMetadata?.author} `}
                </div>
                <div>
                    Powered by <b><a href="https://www.gatsbyjs.org">Gatsby</a></b>
                </div>
            </div>
        </footer>
    )
}

export default Footer
