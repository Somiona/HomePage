import React from "react"
import MainLayout from "../components/MainLayout"
import { Link } from "gatsby"

class Index extends React.Component<any, any> {
    public render() {
        return (
            <MainLayout location={this.props.location} title={"Main Page"}>
                <div>
                    Hi, this is Somion <br/>
                    <Link to={"/404"}>
                        Here's a link to 404 page. Just for test
                    </Link> <br/>
                    <Link to={"/kjasda"}>
                        Also, one for non-sense uri
                    </Link>
                </div>
            </MainLayout>
        )
    }
}

export default Index
