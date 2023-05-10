const deletePost = /* GraphQL */ `
  mutation DeletePost($uuid: String!) {
    deletePost(uuid: $uuid) {
      uuid
    }
  }
`

export default deletePost
