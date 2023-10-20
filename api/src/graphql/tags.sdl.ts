export const schema = gql`
  type Tag {
    id: Int!
    name: String!
    description: String!
    on_jobs: [Job]!
    watched_by: [User]!
  }

  type Query {
    tags: [Tag!]! @requireAuth
  }

  input CreateTagInput {
    name: String!
    description: String!
  }

  input UpdateTagInput {
    name: String
    description: String
  }
`
