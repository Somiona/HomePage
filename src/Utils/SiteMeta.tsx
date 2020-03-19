import { graphql, useStaticQuery } from "gatsby";

const useSiteMeta = () => {
    const { site } = useStaticQuery<GatsbyTypes.SiteMetaQuery>(
        graphql`
            query SiteMeta {
                site {
                    siteMetadata {
                        siteName
                        description
                        author
                        siteUrl
                        keyWords
                    }
                }
            }
        `
    );

    const siteMetadata = site?.siteMetadata;

    return siteMetadata;
};

export default useSiteMeta;
