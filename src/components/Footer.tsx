import React, { FC, ReactNode } from "react"
import * as styles from "../styles/components/footer.module.scss"

interface IFooterProps {
    children?: ReactNode;
}

const Footer: FC<IFooterProps> = (props) => {
    return (
        <footer>
            <div className={styles.scssFooter}>{props.children}</div>
        </footer>
    )
}

Footer.defaultProps = {
    children: (
        <div>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
    ),
}

export default Footer
