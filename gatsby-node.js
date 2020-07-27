const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const articles = await graphql(`
        {
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        fields {
                            dest_url
                        }
                        excerpt(pruneLength: 100)
                        frontmatter {
                            title
                            date
                            keyWords
                            series
                        }
                        html
                    }
                }
            }
        }
    `);

    const posts = articles.data.allMarkdownRemark.edges;
    posts.forEach((edge, index) => {
        const url = edge.node.fields.dest_url;
        const prev = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;
        createPage({
            path: `${url}`,
            component: require.resolve("./src/templates/Article.tsx"),
            context: {
                dest_url: url,
                current: edge.node,
                prev,
                next,
            },
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const url = `/articles${createFilePath({ node, getNode })}`;
        createNodeField({
            node,
            name: `dest_url`,
            value: url,
        });
    }
};

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
    if (getConfig().mode === "production") {
        actions.setWebpackConfig({
            devtool: false,
        });
    }
};
