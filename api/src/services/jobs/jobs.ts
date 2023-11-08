import type {
  QueryResolvers,
  JobRelationResolvers,
  MutationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const search: QueryResolvers['search'] = async ({ query, tags }) => {
  if (!tags) {
    return db.job.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    })
  }
  let tag_ids = tags.split(',')

  let tag_ids_as_number = tag_ids.map((val) => Number(val))

  let conditions = tag_ids_as_number.map((val) => ({tags: { some: {id: val}}}))

  return db.job.findMany({
    where: {
      AND: {
        title: {
          contains: query,
        },
        AND: conditions
      },
    },
  })
}

export const recommended_jobs: QueryResolvers['recommended_jobs'] =
  async () => {
    let user_id = context.currentUser.id

    let user = await db.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        watches: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    let followed_tag_ids = user.watches.map((val) => val.id)

    if (followed_tag_ids.length === 0) {
      return db.job.findMany({
        take: 10,
        orderBy: {
          id: 'desc',
        },
      })
    }
    return db.job.findMany({
      where: {
        tags: {
          some: {
            id: {
              in: followed_tag_ids,
            },
          },
        },
      },
      take: 10,
    })
  }

export const jobDetail: QueryResolvers['jobDetail'] = ({ id }) => {
  return db.job.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
}

export const createJob: MutationResolvers['createJob'] = ({ input }) => {
  return db.job.create({
    data: {
      ...input,
      managerId: context.currentUser.id,
    },
  })
}

export const Job: JobRelationResolvers = {
  manager: (_obj, { root }) => {
    return db.job.findUnique({ where: { id: root?.id } }).manager()
  },
  tags: (_obj, { root }) => {
    return db.job.findUnique({ where: { id: root?.id } }).tags()
  },
}
