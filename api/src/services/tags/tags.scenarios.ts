import type { Prisma, Tag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<
  Prisma.TagCreateArgs | Prisma.UserCreateArgs,
  'tag' | 'user'
>({
  tag: {
    one: { data: {id: 1, name: 'Healthcare', description: 'String' } },
    two: {
      data: {
        name: 'Sports',
        id: 2,
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
    three: {data: {id: 3, name: "Senior Citizen Care", description: "String"}}
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
