import React, { FC, ReactNode } from "react"
import { Hn, HtmlTitleLevel } from "../../Utils/HtmlTitleLevel"
import Footer from "../Footer"
import Header from "../Header"
import Container from "react-bootstrap/Container"
import { FooterContent, HeaderTitle } from "../HeaderAndFooterContent"

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

    return (
        <div {...rest}>
            <Header>
                <HeaderTitle/>
            </Header>

            <main role={"main"} className={"flex-shrink-0"}>
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
