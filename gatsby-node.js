exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const products = await graphql(`
    {
      allFJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  products.data.allFJson.edges.forEach(edge => {
    const product = edge.node
    createPage({
      path: `/aaa/${product.slug}/`,
      component: require.resolve("./src/templates/product.tsx"),
      context: {
        slug: product.slug,
      },
    })
  })

  const articles = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  articles.data.allMarkdownRemark.edges.forEach(edge => {
    const html = edge.node.html;
    const title = edge.node.frontmatter.title
    createPage({
      path: `/articles/${title}`,
      component: require.resolve("./src/templates/Article.tsx"),
      context: {
        article: html
      }
    })
  })
}