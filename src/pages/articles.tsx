import React, { FC } from "react";
import SEO from "../components/Utils/SEO";

interface IArticles {
    location: Location;
}

const Articles: FC<IArticles> = ({ location }) => (
    <>
        <SEO location={location} />
        {/* <MainLayout location={location} title="articles" /> */}
    </>
);

export default Articles;
