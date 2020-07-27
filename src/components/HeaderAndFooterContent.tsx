import { OutboundLink } from "gatsby-plugin-google-analytics";
import React, { FC } from "react";
import useSiteMeta from "../Utils/SiteMeta";

export const HeaderTitle: FC<{}> = () => {
    const siteMetadata = useSiteMeta();

    return (
        <>
            <span className="header-title">
                {siteMetadata?.siteName as string}
            </span>
            <span className="header-author">
                {siteMetadata?.author as string}
            </span>
        </>
    );
};

export const FooterContent: FC<{}> = () => {
    const siteMetadata = useSiteMeta();
    const thisYear = new Date().getFullYear();
    const year = `${thisYear - 1} - ${thisYear}`;
    return (
        <>
            <div>{`© ${year} ${siteMetadata?.author} `}</div>
            <div>
                Powered by{" "}
                <b>
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </b>
            </div>
            <div>
                <OutboundLink href="https://www.pixiv.net/artworks/75393550">
                    Main Background Picture{" "}
                </OutboundLink>
                BY
                <OutboundLink href="https://www.pixiv.net/member.php?id=16600489">
                    {" "}
                    Leiq @ Pixiv
                </OutboundLink>
            </div>
        </>
    );
};
