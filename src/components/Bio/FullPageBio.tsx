import React, { FC } from "react"
import "../../styles/bio/_full_page.scss"
import LiteratureClock from "./LiteratureClock"
import ScrollDown from "./ScrollDown"

const FullPageBio: FC<{}> = () => {
    return (
        <div className={"index-bg d-flex min-vh-100 align-items-center text-center flex-column"}>
            <LiteratureClock className={"literature-clock mt-auto text-white"}/>
            <ScrollDown className={"mt-auto py-3 scroll-down text-white"}/>
        </div>
    )
}

export default FullPageBio
