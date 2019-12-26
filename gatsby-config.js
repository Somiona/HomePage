/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteName: "白咕咕のエラーはっせい記録",
    author: "Somiona",
    description: "",
    siteUrl: "https://blog.somiona.live",
  }, plugins: [
    `gatsby-plugin-catch-links`,
    "gatsby-plugin-typescript",
    "gatsby-plugin-tslint",
    {
      resolve: "gatsby-plugin-generate-typings",
      options: {
        dest: "./src/@types/graphql-types.d.ts",
      },
    },
    "gatsby-plugin-sass",
    // {
    //   resolve: "gatsby-plugin-purgecss",
    //   options: {
    //     printRejected: true, // Print removed selectors and processed file names
    //     // develop: true, // Enable while using "gatsby develop"
    //     // tailwind: true, // Enable tailwindcss support
    //     // whitelist: ['whitelist'], // Don't remove this selector
    //     ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
    //     // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
    //   },
    // },
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
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    "gatsby-plugin-sharp",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
  ],
}
