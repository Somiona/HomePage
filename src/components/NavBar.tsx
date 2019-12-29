import React, { ReactNode } from "react"
import Navbar from "react-bootstrap/Navbar"

interface INavBarProp {
    children: ReactNode
    topTrans: boolean
}

// tslint:disable-next-line:class-name
class NavBar extends React.Component<INavBarProp, { trans: boolean }> {
    constructor(props: INavBarProp) {
        super(props)
        const { topTrans } = props
        this.handleScroll = this.handleScroll.bind(this)
        this.render = this.render.bind(this)

        this.state = {
            trans: topTrans,
        }

        if (topTrans && window) {
            window.addEventListener("scroll", this.handleScroll)

        }
    }

    public handleScroll() {
        if (window) {
            if (window.scrollY <= 60) {
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

    public render() {
        return (
            <Navbar variant={"dark"} bg={this.state.trans ? "transparent" : "primary"} expand={"md"} fixed={"top"}>
                {this.props.children}
            </Navbar>
        )
    }
}

export default NavBar
