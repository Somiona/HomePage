import React, { FC } from "react"
import { Link } from "gatsby"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"


interface IHeaderProps {
    title: string;
}

const Header: FC<IHeaderProps> = ({ title }) => {
    return (
        <header>
            <div className={"text-center"}>
                <Navbar variant={"dark"} bg={"primary"} expand={"md"} fixed={"top"}>
                    <Link to={"/"} className={"navbar-brand"}>
                        {title}
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
                </Navbar>
            </div>
        </header>
    )
}


export default Header
