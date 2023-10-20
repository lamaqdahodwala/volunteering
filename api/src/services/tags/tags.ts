import type { QueryResolvers, TagRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const tags: QueryResolvers['tags'] = () => {
  return db.tag.findMany()
}

export const tag: QueryResolvers['tag'] = ({ id }) => {
  return db.tag.findUnique({
    where: { id },
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
