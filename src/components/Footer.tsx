import React, { FC, ReactNode } from "react"


interface IFooterProps {
    children?: ReactNode;
}


const Footer: FC<IFooterProps> = ({ children }) => {
    return (
        <footer>
            <div className={"text-center"}>
                {children}
            </div>
        </footer>
    )
}

export default Footer
