import type { MutationResolvers, QueryResolvers, TagRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const myWatchedTags: QueryResolvers['myWatchedTags'] = async() => {
  let user_id = context.currentUser.id

  let user =  await db.user.findUnique({
    where: {
      id: user_id
    },
    include: {
      watches: true
    }
  })

  return user.watches
}



export const doIWatchTag: QueryResolvers['doIWatchTag'] = async({ id }) => {
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

  const INITIAL_VALUE = 0
  let watched_tags = user.watches.reduce((acc, current) => acc + Number(current.id === id), INITIAL_VALUE)

  return Boolean(watched_tags)

}

export const unwatchTag: MutationResolvers['unwatchTag'] = ({ id }) => {
  let user_id = context.currentUser.id
  return db.tag.update({
    where: {
      id: id
    },
    data: {
      watched_by: {
        disconnect: {
          id: user_id
        }
      }
    }
  })
}


export const watchTag: MutationResolvers['watchTag'] = ({ id }) => {
  let user_id = context.currentUser.id
  return db.tag.update({
    where: {
      id: id
    },
    data: {
      watched_by: {
        connect: {
          id: user_id
        }
      }
    }
  })
}

export const Tag: TagRelationResolvers = {
  on_jobs: (_obj, { root }) => {
    return db.tag.findUnique({ where: { id: root?.id } }).on_jobs()
  },
  watched_by: (_obj, { root }) => {
    return db.tag.findUnique({ where: { id: root?.id } }).watched_by()
  },
}
