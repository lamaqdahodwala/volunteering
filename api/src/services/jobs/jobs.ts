import type { QueryResolvers, JobRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const jobs: QueryResolvers['jobs'] = () => {
  return db.job.findMany()
}

export const job: QueryResolvers['job'] = ({ id }) => {
  return db.job.findUnique({
    where: { id },
  })
}

export const Job: JobRelationResolvers = {
  manager: (_obj, { root }) => {
    return db.job.findUnique({ where: { id: root?.id } }).manager()
  },
}
