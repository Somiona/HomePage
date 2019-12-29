import React, { FC, ReactNode } from "react"
import Container from "react-bootstrap/Container"
import { Hn, HtmlTitleLevel } from "../../Utils/HtmlTitleLevel"
import FullPageBio from "../Bio/FullPageBio"
import Footer from "../Footer"
import Header from "../Header"
import { FooterContent, HeaderTitle } from "../HeaderAndFooterContent"

interface IMainLayout {
    location: Location
    // the Location object of HTML DOM.
    // see: https://www.w3schools.com/jsref/obj_location.asp
    children?: ReactNode;
    title: string;
}

const MainLayout: FC<IMainLayout> = (
    {
        location,
        children,
        title,
    },
) => {
    // @ts-ignore
    const rootPath = `${__PATH_PREFIX__}/`
    // ``和““是不同的。``会执行里面${}的东西
    const isRoot = location.pathname === rootPath
    const articleTitle = (
        <Hn type={isRoot ? HtmlTitleLevel.H1 : HtmlTitleLevel.H2}>
            {title}
        </Hn>
    )

    return (
        <div className={"flex-column d-flex min-vh-100"}>
            <Header topTrans={isRoot}>
                <HeaderTitle/>
            </Header>
            {isRoot ? <FullPageBio/> : null}
            <main role={"main"} className={"main flex-shrink-0 flex-grow-1"}>
                <Container>
                    {articleTitle}
                    {children}
                </Container>
            </main>

            <Footer>
                <FooterContent/>
            </Footer>
        </div>
    )
}

export default MainLayout
