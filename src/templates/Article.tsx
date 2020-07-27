import "prismjs/themes/prism-solarizedlight.css";
import React, { FC } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import PostLayout from "../components/Layouts/PostLayout";
import SEO from "../components/Utils/SEO";

interface IArticleNode {
    fields: {
        destUrl: string;
    };
    excerpt: string;
    frontmatter: {
        title: string;
        date: string;
        keyWords: string | string[];
    };
    html: string;
}

interface IArticle {
    pageContext: {
        destUrl: string;
        current: IArticleNode;
        prev: IArticleNode;
        next: IArticleNode;
    };
    location: Location;
}

const Article: FC<IArticle> = ({ pageContext, location }) => {
    const article = pageContext.current.html;
    const { title } = pageContext.current.frontmatter;
    const description = pageContext.current.excerpt;
    const keywords = pageContext.current.frontmatter.keyWords;
    return (
        <>
            <SEO
                description={description}
                title={title}
                location={location}
                keywords={keywords}
            />
            <MainLayout location={location} title={title}>
                <PostLayout>
                    <section dangerouslySetInnerHTML={{ __html: article }} />
                </PostLayout>
            </MainLayout>
        </>
    );
};
export default Article;
