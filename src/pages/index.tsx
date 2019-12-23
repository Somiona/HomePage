import React, { FC, ReactNode } from "react"
import MainLayout from "../components/MainLayout"
import { graphql, Link, useStaticQuery } from "gatsby"
import { AvaliableLinksQuery } from "../@types/graphql-types"
import SEO from "../components/SEO"

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
        .sort()
        .map(
            (path) => {
                if (typeof path === "string") {
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

const Index: FC<{ location: Location }> = ({ location }) => {
    return (
        <>
            <SEO location={location}/>
            <MainLayout location={location} title={"Main Page"}>
                {/*here, location is indeed a Location Object of html dom
                    see: https://www.w3schools.com/jsref/obj_location.asp
                */}
                <div>
                    Hi, this is Somion <br/>
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
