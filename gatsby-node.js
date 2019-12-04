exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const results = await graphql(`
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
  results.data.allFJson.edges.forEach(edge => {
    const product = edge.node
    createPage({
      path: `/aaa/${product.slug}/`,
      component: require.resolve("./src/templates/product.tsx"),
      context: {
        slug: product.slug,
      },
    })
  })

}
