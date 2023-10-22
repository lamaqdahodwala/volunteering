import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  manages: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).manages()
  },
}
