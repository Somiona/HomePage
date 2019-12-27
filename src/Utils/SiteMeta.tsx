import { graphql, useStaticQuery } from "gatsby"
import { SiteMetaQuery } from "../@types/graphql-types"


const useSiteMeta = () => {
    const { site }: SiteMetaQuery = useStaticQuery(
        graphql`
            query SiteMeta{
                site {
                    siteMetadata {
                        siteName
                        description
                        author
                        siteUrl
                    }
                }
            }
        `,
    )

    const siteMetadata = site?.siteMetadata

    return siteMetadata
};

export default useSiteMeta;
