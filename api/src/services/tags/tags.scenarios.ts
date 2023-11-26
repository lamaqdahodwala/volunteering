import type { Prisma, Tag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<
  Prisma.TagCreateArgs | Prisma.UserCreateArgs,
  'tag' | 'user'
>({
  tag: {
    one: { data: { name: 'String', description: 'String' } },
    two: {
      data: {
        name: 'String',
        description: 'String',
        watched_by: {
          create: {
            id: 2,
            username: 'jose',
            hashedPassword: 'pw',
            salt: 'salt',
          },
        },
      },
    },
  },
  user: {
    one: {
      data: {
        id: 1,
        username: 'joe',
        hashedPassword: 'pw',
        salt: 'salt',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Tag, 'tag'>
