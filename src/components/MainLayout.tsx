import React, { FC, ReactNode } from "react"

import Footer from "./Footer"
import Header from "./Header"
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface IMainLayout {
    children?: ReactNode;
}

const MainLayout: FC<IMainLayout> = (
    {
        children, ...rest
    },
) => {
    const coffee = <FontAwesomeIcon icon={faCoffee} />
    const check = <FontAwesomeIcon icon={faCheckSquare} />

    return (
        <div {...rest}>
            <Header>
                <div style={{color: "#4bb571", display: "inline"}}>
                    {check}
                </div>
                Favourite Drink:
                <div style={{color: "brown", display: "inline"}}>
                    {coffee}
                </div>
            </Header>
            {children}
            <Footer/>
        </div>
    )
}

export default MainLayout;
