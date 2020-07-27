import React, { FC } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import SEO from "../components/Utils/SEO";

interface IArticles {
    location: Location;
}

const Articles: FC<IArticles> = ({ location }) => (
    <>
        <SEO location={location} />
        <MainLayout location={location} title="articles" />
    </>
);

export default Articles;
