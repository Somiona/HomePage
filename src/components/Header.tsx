import React, { FC, ReactNode } from "react"
import { Link } from "gatsby"
import * as styles from "../styles/components/header.module.scss"

interface IHeaderProps {
    children?: ReactNode;
}

const Header: FC<IHeaderProps> = (props) => {
    return (
        <header>
            <div className={styles.scssHeader}>
                <Link to={"/"}>
                    {props.children}
                </Link>
            </div>
        </header>
    )
}

Header.defaultProps = {
    children: <div>Somion's Blog</div>,
}


export default Header
