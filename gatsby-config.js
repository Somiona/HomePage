/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const cssWhiteList = ["fixed-top", "collapsed", "container", "collapse"];
const cssWhitePattern = [/^nav/, /^bg-/];

module.exports = {
    /* Your site config here */
    siteMetadata: {
        siteName: "白咕咕のエラーはっせい記録",
        author: "Somiona",
        description:
            "Somiona's blog here. Computing and Mathematics undergraduate. " +
            "Some class Notes, java, rust, html, reactjs, sass, gatsby and more. " +
            "这里是索麦恩的个人博客，由Gatsby构建。一些学习笔记，生活记录",
        siteUrl: "https://blog.somiona.live",
        keyWords:
            "blog,somiona,somion,博客,reactjs,java,diary,日志,日记,python,sass",
    },
    plugins: [
        "gatsby-plugin-catch-links",
        "gatsby-plugin-typescript",
        "gatsby-plugin-sass",
        "gatsby-transformer-sharp",
        "gatsby-transformer-json",
        "gatsby-plugin-sharp",
        "gatsby-plugin-offline",
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-plugin-minify-classnames`,
            options: {
                develop: true, // Enable on `gatsby develop`
            },
        },
        {
            resolve: "gatsby-plugin-purgecss",
            options: {
                printRejected: true, // Print removed selectors and processed file names
                develop: false, // Enable while using "gatsby develop"
                // tailwind: true, // Enable tailwindcss support
                whitelist: cssWhiteList, // Don't remove this selector
                whitelistPatterns: cssWhitePattern,
                ignore: ["prismjs/", "docsearch.js/"], // Ignore files/folders
                // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
                purgeOnly: ["bootstrap/"], // Purge only these files/folders
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: "gatsby-remark-responsive-iframe",
                        options: {
                            wrapperStyle: "margin-bottom: 1.0725rem",
                        },
                    },
                    "gatsby-remark-prismjs",
                    "gatsby-remark-copy-linked-files",
                    "gatsby-remark-smartypants",
                ],
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: "./content/articles",
                name: "articles",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: "./content/assets",
                name: "assets",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: "./content/data",
                name: "data",
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: "UA-155100629-1",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: ["/preview/**", "assets/", "images/"],
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Enables Google Optimize using your container Id
                // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
                // Enables Google Optimize Experiment ID
                // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // Set Variation ID. 0 for original 1,2,3....
                // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                // Any additional optional fields
                siteSpeedSampleRate: 10,
                cookieDomain: "blog.somiona.live",
                allowAdFeatures: false,
                forceSSL: true,
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                sitemapSize: 500,
                exclude: [
                    "/404",
                    "/404.html",
                    "/dev-404-page",
                    "/offline-plugin-app-shell-fallback",
                ],
            },
        },
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                policy: [
                    {
                        userAgent: "*",
                        allow: "/",
                        disallow: ["/404", "/404.html", "/assets", "/images"],
                        crawlDelay: 5,
                    },
                ],
            },
        },
        // {
        //     resolve: "gatsby-plugin-typegen",
        //     options: {
        //         outputPath: "src/@types/graphql-types.d.ts",
        //         emitSchema: {
        //             "src/@types/gatsby-introspection.json": true,
        //         },
        //     },
        // },
    ],
};
