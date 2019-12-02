import React, { FC, ReactNode } from "react"
import { Hn, HtmlTitleLevel } from "../Utils/HtmlTitleLevel"

import Footer from "./Footer"
import Header from "./Header"

interface IMainLayout {
    location: any
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
    const rootPath = "/"
    const level =
        location.pathname === rootPath ?
            HtmlTitleLevel.H1 :
            HtmlTitleLevel.H2
    const articleTitle = (
        <Hn type={level}>
            {title}
        </Hn>
    )

    return (
        <div {...rest}>
            <Header/>
            <main>
                {articleTitle}
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout
