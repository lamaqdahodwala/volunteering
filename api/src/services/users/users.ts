import type { MutationResolvers, QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const doesUserHaveSecretPhraseSetUp: QueryResolvers['doesUserHaveSecretPhraseSetUp'] = async() => {
    let user_id = context.currentUser.id

    let user = await db.user.findUnique({
      where: {
        id: user_id
      }
    })
    return !!user.secret_phrase
}

export const setSecretPhrase: MutationResolvers['setSecretPhrase'] = async({ phrase }) => {
  let user_id = context.currentUser.id

  let user = await db.user.findUnique({
    where: {
      id: user_id
    }
  })

  if (user.secret_phrase) return

  await db.user.update({
    where: {
      id: user_id
    },
    data: {
      secret_phrase: phrase
    },
  })

  return await db.user.findUnique({
    where: {
      id: user_id
    }
  })
}

export const User: UserRelationResolvers = {
  manages: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).manages()
  },
}
