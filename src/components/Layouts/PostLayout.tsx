import React, { FC, ReactNode } from "react"

interface IPostLayout {
    children?: ReactNode
}

const PostLayout: FC<IPostLayout> = ({ children }) => {
    return (
        <div>
            <article>
                {children}
            </article>
        </div>
    )
}

export default PostLayout
