import React, { FC, ReactNode } from "react"
import MainLayout from "../components/MainLayout"
import { graphql, Link, useStaticQuery } from "gatsby"
import { AvaliableLinksQuery } from "../@types/graphql-types"

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
        <MainLayout location={location} title={"Main Page"}>
            {/*here, location is indeed a Location Object of html dom
                    see: https://www.w3schools.com/jsref/obj_location.asp
                */}
            <div>
                Hi, this is Somion <br/>
                <Link to={"/404"}>
                    Here's a link to 404 page. Just for test
                </Link> <br/>
                <Link to={"/kjasda"}>
                    Also, one for non-sense uri
                </Link>
                <div>
                    <hr/>
                    all Possible Links:
                    {renderLinks()}
                </div>
            </div>
        </MainLayout>
    )
}

export default Index
