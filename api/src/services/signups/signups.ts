import type { QueryResolvers, SignupRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const signups: QueryResolvers['signups'] = () => {
  return db.signup.findMany()
}

export const signup: QueryResolvers['signup'] = ({ id }) => {
  return db.signup.findUnique({
    where: { id },
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
