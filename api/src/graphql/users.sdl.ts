export const schema = gql`
  type User {
    id: Int!
    username: String!
    roles: String!
    manages: [Job]!
    signups: [Signup!]!
  }

  type Query {
    user(id: Int!): User! @requireAuth
    doesUserHaveSecretPhraseSetUp: Boolean! @requireAuth

  }

  type Mutation {
    setSecretPhrase(phrase: String!): User! @requireAuth
  }

  input CreateUserInput {
    username: String!
    roles: String!
  }

  input UpdateUserInput {
    username: String
    roles: String
  }
`
