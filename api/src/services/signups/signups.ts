import type { MutationResolvers, QueryResolvers, SignupRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const signups: QueryResolvers['signups'] = () => {
  return db.signup.findMany()
}

export const signupForJob:  MutationResolvers['signupForJob'] = async({ job_id }) => {
  let job = await db.job.findUniqueOrThrow({
    where: {
      id: job_id
    },
    include: {
      _count: {
        select: {
          signups: true
        }
      }
    }
  })

  if (job._count.signups + 1 > job.max_signups){
    return null
  }
  return db.signup.create({
    data: {
      for_user: {
        connect: {
          id: context.currentUser.id
        }
      },
      on_job: {
        connect: {
          id: job_id
        }
      }
    }
  })
}

export const removeSignupForJob: MutationResolvers['removeSignupForJob'] = async({ job_id }) => {
  let user_id = context.currentUser.id


  let signup = await db.signup.findUniqueOrThrow({
    where: {
      on_job: {
        id: job_id
      },
      for_user: {
        id: user_id
      }
    }
  })

  return db.signup.delete({
    where: {
      id: signup.id
    }
  })
}
export const Signup: SignupRelationResolvers = {
  on_job: (_obj, { root }) => {
    return db.signup.findUnique({ where: { id: root?.id } }).on_job()
  },
  for_user: (_obj, { root }) => {
    return db.signup.findUnique({ where: { id: root?.id } }).for_user()
  },
}
