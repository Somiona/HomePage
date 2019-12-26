import React, { FC } from "react"

import MainLayout from "../components/Layouts/MainLayout"

interface INotFoundPage {
    location: any;
}

const NotFoundPage: FC<INotFoundPage> = ({ location }) => {
    return (
        <MainLayout location={location} title={"Oops"}>
            <h1>404: Not found</h1>
            <p>You might not want this.. Your request falls into the hell of null</p>
        </MainLayout>
    )
}

export default NotFoundPage
