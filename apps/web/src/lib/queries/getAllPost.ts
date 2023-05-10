const getAllPost = /* GraphQL */ `
  query GetAllPosts {
    getAllPosts {
      uuid
      title
      createdAt
      content
    }
  }
`

export default getAllPost
