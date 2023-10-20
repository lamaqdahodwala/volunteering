export const schema = gql`
  type Signup {
    id: Int!
    on_job: Job!
    for_user: User!
    userId: Int!
    jobId: Int!
    completed: Boolean!
  }

  type Query {
    signups: [Signup!]! @requireAuth
  }

  input CreateSignupInput {
    userId: Int!
    jobId: Int!
    completed: Boolean!
  }

  input UpdateSignupInput {
    userId: Int
    jobId: Int
    completed: Boolean
  }
`
