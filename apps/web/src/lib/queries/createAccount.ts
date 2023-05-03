const createAccount = /* GraphQL */ `
  mutation CreateAccount($email: String!, $password: String!, $name: String!) {
    createAccount(email: $email, password: $password, name: $name) {
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
export default createAccount
