import React, { FC } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import SEO from "../components/Utils/SEO";

interface ITags {
    location: Location;
}

const Tags: FC<ITags> = ({ location }) => (
    <>
        <SEO location={location} />
        <MainLayout location={location} title="Tags" />
    </>
);

export default Tags;
