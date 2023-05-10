const updatePost = /* GraphQL */ `
  mutation UpdatePost($uuid: String!, $title: String, $content: String) {
    updatePost(uuid: $uuid, title: $title, content: $content) {
      uuid
      updatedAt
      title
      createdAt
      content
      authorUuid
    }
  }
`

export default updatePost
