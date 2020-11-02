import React, { FC } from "react";
import SEO from "../components/Utils/SEO";

interface ITags {
    location: Location;
}

const Tags: FC<ITags> = ({ location }) => (
    <>
        <SEO location={location} />
        {/* <MainLayout location={location} title="Tags" /> */}
    </>
);

export default Tags;
