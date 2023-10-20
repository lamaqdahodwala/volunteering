export const schema = gql`
  type Job {
    id: Int!
    title: String!
    description: String!
    manager: User!
    managerId: Int!
    max_signups: Int!
    minimum_age: Int!
  }

  type Query {
    jobs: [Job!]! @requireAuth
  }

  input CreateJobInput {
    title: String!
    description: String!
    managerId: Int!
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