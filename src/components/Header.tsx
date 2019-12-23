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
            <Navbar bg={"light"} expand={"lg"}>
                <Navbar.Brand>
                    <Link to={"/"}>
                        {title}
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                <Navbar.Collapse id={"basic-navbar-nav"}>
                    <Nav className={"mr-auto"}>
                        <Nav.Link>Homes</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}


export default Header
