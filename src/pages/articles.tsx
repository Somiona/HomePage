import React, { FC } from "react"
import MainLayout from "../components/Layouts/MainLayout"
import SEO from "../components/SEO"

interface IArticles {
    location: Location
}

const Articles: FC<IArticles> = (
    { location },
) => {
    return (
        <>
            <SEO location={location}/>
            <MainLayout location={location} title={"articles"}/>
        </>
    )
}

export default Articles
