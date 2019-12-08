import React, { FC } from "react"
import "prismjs/themes/prism-solarizedlight.css"

interface IArticle {
    pageContext: any
}

const Article: FC<IArticle> = ({ pageContext }) => (
    <div>
        <section dangerouslySetInnerHTML={{__html: pageContext.article}} />
    </div>
)

export default Article
