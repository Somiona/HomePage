import { Link } from "gatsby"
import React, { ReactNode } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import "../styles/components/_header.scss"
import withDefaultProps from "../Utils/DefaultPropsUtil"

const defaultProps = {
    topTrans: false,
}

type IHeaderProps = {
    children: ReactNode;
} & Readonly<typeof defaultProps>

class HeaderD extends React.Component<IHeaderProps, { trans: boolean }> {
    constructor(props: IHeaderProps) {
        super(props)
        const { topTrans } = props
        this.handleScroll = this.handleScroll.bind(this)
        this.render = this.render.bind(this)

        this.state = {
            trans: topTrans,
        }

        if (typeof window !== "undefined") {
            if (topTrans && window) {
                window.addEventListener("scroll", this.handleScroll)
            }
        }
    }

    public handleScroll() {
        if (typeof window !== "undefined") {
            const getHeight = () => {
                return window.innerHeight
            }
            if (window) {
                if (window.scrollY <= getHeight() / 5) {
                    this.setState(() => ({
                        trans: true,
                    }))
                } else {
                    this.setState(() => ({
                        trans: false,
                    }))
                }
            }
        }
    }

    public render() {
        return (
            <header className={"header"}>
                <Navbar variant={"dark"} bg={this.state.trans ? "transparent" : "primary"} expand={"md"} fixed={"top"}>
                    <Link to={"/"} className={"navbar-brand"}>
                        {this.props.children}
                    </Link>
                    <Navbar.Toggle aria-controls={"navCollapse"}/>
                    <Navbar.Collapse id={"navCollapse"}>
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
            </header>
        )
    }
}


const Header = withDefaultProps(
    defaultProps,
    HeaderD,
)

export default Header
