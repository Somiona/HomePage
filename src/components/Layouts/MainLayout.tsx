import React, { FC, ReactNode } from "react"
import { Hn, HtmlTitleLevel } from "../../Utils/HtmlTitleLevel"

import Footer from "../Footer"
import Header from "../Header"
import useSiteMeta from "../../Utils/SiteMeta"

interface IMainLayout {
    location: Location
    // the Location object of HTML DOM.
    // see: https://www.w3schools.com/jsref/obj_location.asp
    children: ReactNode;
    title: string;
}

const MainLayout: FC<IMainLayout> = (
    {
        location,
        children,
        title,
        ...rest
    },
) => {
    // @ts-ignore
    const rootPath = `${__PATH_PREFIX__}/`
    // ``和““是不同的。``会执行里面${}的东西
    const level =
        location.pathname === rootPath ?
            HtmlTitleLevel.H1 :
            HtmlTitleLevel.H2
    const articleTitle = (
        <Hn type={level}>
            {title}
        </Hn>
    )

    const siteMetadata = useSiteMeta()

    return (
        <div {...rest}>
            <Header title={siteMetadata?.siteName as string}/>
            <main>
                {articleTitle}
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout
