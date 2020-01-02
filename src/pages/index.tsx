import { graphql, Link, useStaticQuery } from "gatsby"
import React, { FC, ReactNode } from "react"
import { AvaliableLinksQuery } from "../@types/graphql-types"
import MainLayout from "../components/Layouts/MainLayout"
import SEO from "../components/Utils/SEO"

const Index: FC<{ location: Location }> = ({ location }) => {
    return (
        <>
            <SEO location={location}/>
            <MainLayout location={location} title={"Main Page"}>
                {/*here, location is indeed a Location Object of html dom
                    see: https://www.w3schools.com/jsref/obj_location.asp
                */}
                <div>
                    Hi, this is Somiona <br/>
                    <hr/>
                    <div>
                        all Possible Links:
                        {renderLinks()}
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Index

function renderLinks(): ReactNode {
    const data: AvaliableLinksQuery = useStaticQuery(
        graphql`
            query AvaliableLinks {
                allSitePage {
                    edges{
                        node{
                            path
                        }
                    }
                }
            }
        `,
    )

    const listItems = data.allSitePage.edges
        .map(
            (node) => {
                return node.node.path
            },
        )
        .sort().map(
            (path) => {
                if (typeof path === "string" && path.includes("/articles/")) {
                    return (
                        <li>
                            <Link to={path}>
                                {path}
                            </Link>
                        </li>
                    )
                } else {
                    return null
                }
            },
        )

    return (
        <ul>{listItems}</ul>
    )
}


