export const schema = gql`
  type Tag {
    id: Int!
    name: String!
    description: String!
    on_jobs: [Job]!
    watched_by: [User]!
  }

  type Query {
    myWatchedTags: [Tag!]! @requireAuth
  }

  type Mutation {
    watchTag(id: Int!): Tag! @requireAuth
    unwatchTag(id: Int!): Tag! @requireAuth
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
