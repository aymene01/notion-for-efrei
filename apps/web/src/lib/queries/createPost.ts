const createPost = /* GraphQL */ `
  mutation CreatePost($title: String!) {
    createPost(title: $title) {
      uuid
      updatedAt
      title
      createdAt
      content
      authorUuid
    }
  }
`
export default createPost
