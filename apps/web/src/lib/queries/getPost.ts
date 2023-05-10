const getPost = /* GraphQL */ `
  query GetPost($uuid: String!) {
    getPost(uuid: $uuid) {
      uuid
      title
      content
    }
  }
`

export default getPost
