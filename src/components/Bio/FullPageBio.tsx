import React, { FC } from "react"
import "../../styles/bio/_full_page.scss"
import LiteratureClock from "../Utils/LiteratureClock"

const FullPageBio: FC<{}> = () => {
    return (
        <div className={"index-bg d-flex min-vh-100 align-items-center"}>
            <LiteratureClock/>
        </div>
    )
}

export default FullPageBio
