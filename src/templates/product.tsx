import React, { FC } from "react"

interface IProduct {
    pageContext: any
}

const Product: FC<IProduct> = ({ pageContext }) => (
    <div>
        <p>Name is: {pageContext.slug}</p>
    </div>
)

export default Product
