import { graphql, Link, useStaticQuery } from "gatsby";
import React, { ReactNode, FC } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import SEO from "../components/Utils/SEO";

function renderLinks(): ReactNode {
    const data = useStaticQuery<GatsbyTypes.AvailableLinksQuery>(
        graphql`
            query AvailableLinks {
                allSitePage {
                    edges {
                        node {
                            path
                        }
                    }
                }
            }
        `
    );

    const listItems = data.allSitePage.edges
        .map((node) => node.node.path)
        .sort()
        .map((path) => {
            if (typeof path === "string" && path.includes("/articles/")) {
                return (
                    <li>
                        <Link to={path}>{path}</Link>
                    </li>
                );
            }
            return null;
        });

    return <ul>{listItems}</ul>;
}

const Index: FC<{ location: Location }> = ({ location }) => (
    <>
        <SEO location={location} />
        <MainLayout location={location} title="Main Page">
            {/* here, location is indeed a Location Object of html dom
                    see: https://www.w3schools.com/jsref/obj_location.asp
                */}
            <div>
                Hi, this is Somion
                <br />
                <hr />
                <div>
                    all Possible Links:
                    {renderLinks()}
                </div>
            </div>
        </MainLayout>
    </>
);

export default Index;
