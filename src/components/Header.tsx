import React, { FC, ReactNode} from "react"

interface IHeaderProps {
    children?: ReactNode;
}

const Header: FC<IHeaderProps> = (props) => {
    return (
        <h1>
            {props.children}
        </h1>
    )
}

Header.defaultProps = {
    children: <div>Add children to customize header</div>
}

export default Header
