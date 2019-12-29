import { Link } from "gatsby"
import React, { FC, ReactNode } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import withDefaultProps from "../Utils/DefaultPropsUtil"
import NavBar from "./NavBar"

const defaultProps = {
    topTrans: false,
}

type IHeaderProps = {
    children: ReactNode;
} & Readonly<typeof defaultProps>

const HeaderD: FC<IHeaderProps> = ({ children, topTrans }) => {
    return (
        <header>
            <NavBar topTrans={topTrans}>
                <Link to={"/"} className={"navbar-brand"}>
                    {children}
                </Link>
                <Navbar.Toggle aria-controls={"top-navbar-nav"}/>
                <Navbar.Collapse id={"top-navbar-nav"}>
                    <Nav className={"mr-auto"}>
                        <Nav.Item>
                            <Link to={"/"} className={"nav-link"}>
                                Home
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={"#"} className={"disabled"}>About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={"#"} className={"disabled"}>Tag</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </NavBar>
        </header>
    )
}

const Header = withDefaultProps(
    defaultProps,
    HeaderD,
)

export default Header
