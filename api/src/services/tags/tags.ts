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
