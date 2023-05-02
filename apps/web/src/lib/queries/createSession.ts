const createSession = /* GraphQL */ `
  mutation CreateSession($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      user {
        uuid
        password
        name
        email
      }
      meta {
        token
      }
    }
  }
`
export default createSession
