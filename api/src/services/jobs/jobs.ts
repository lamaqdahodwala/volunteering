import type { QueryResolvers, JobRelationResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const search: QueryResolvers['search'] = async({ query }) => {
  let regex = /\[(.*?)\]/gm

  let matches = query.match(regex)

  let tag_matches = matches.map((val) => val.slice(1, -1))

  matches.forEach((val) => {
    query = query.replace(val, "").trim()
  })

  let text_query = query

  let params:any = {}

  if ( tag_matches ) {
    params.where.tags.some.name.in = tag_matches
  }

  if (text_query) {
    params.where.title.contains = text_query
  }
  let jobs = await db.job.findMany({
    ...params
  })

  return jobs

}

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

export const createJob: MutationResolvers['createJob'] = ({ input }) => {
  return db.job.create({
    data: {
      ...input,
      managerId: context.currentUser.id
    }
  })
}


export const Job: JobRelationResolvers = {
  manager: (_obj, { root }) => {
    return db.job.findUnique({ where: { id: root?.id } }).manager()
  },
}
