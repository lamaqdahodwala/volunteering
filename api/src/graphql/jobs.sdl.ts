export const schema = gql`
  type Job {
    id: Int!
    title: String!
    description: String!
    manager: User!
    managerId: Int!
    max_signups: Int!
    minimum_age: Int!
    signups: [Signup!]!
    datetime: DateTime!
    tags: [Tag!]!
  }

  type Query {
    recommended_jobs: [Job!]! @requireAuth
    search(query: String!): [ Job! ]! @skipAuth
    jobDetail(id: Int!): Job! @skipAuth
  }

  type Mutation {
    createJob(input: CreateJobInput): Job! @requireAuth(roles: "business")
  }

  input CreateJobInput {
    title: String!
    description: String!
    max_signups: Int!
    minimum_age: Int!
  }

  input UpdateJobInput {
    title: String
    description: String
    managerId: Int
    max_signups: Int
    minimum_age: Int
  }
`
