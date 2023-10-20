import type { QueryResolvers, JobRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'


export const recommended_jobs: QueryResolvers['recommended_jobs'] = async () => {
  let user_id = context.currentUser.id

  let user = await db.user.findUnique({
    where: {
      id: user_id
    },
    include: {
      watches: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  let followed_tag_ids = user.watches.map((val) => val.id)
  return db.job.findMany({
    where: {
      tags: {
        some: {
          id: {
            in: followed_tag_ids
          }
        }
      }
    }
  })
}


export const jobDetail: QueryResolvers['jobDetail'] = ({ id }) => {
  return db.job.findUniqueOrThrow({
    where: {
      id: id
    }
  })
}


export const Job: JobRelationResolvers = {
  manager: (_obj, { root }) => {
    return db.job.findUnique({ where: { id: root?.id } }).manager()
  },
}
