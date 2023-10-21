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
    viewUpcomingJobs: [Signup!]! @requireAuth
    viewVolunteerLog: [Signup!]! @requireAuth
  }

  type Mutation {
    signupForJob(job_id: Int!): Signup @requireAuth
    removeSignupForJob(job_id: Int!): Signup!
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
