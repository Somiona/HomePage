import React, { FC, ReactNode } from "react";

interface IPostLayout {
    children?: ReactNode;
}

const PostLayout: FC<IPostLayout> = ({ children }) => (
    <div>
        <article>{children}</article>
    </div>
);

export default PostLayout;
