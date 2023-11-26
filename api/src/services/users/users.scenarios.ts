import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        id: 1,
        username: 'String8498567',
        salt: 'salt',
        hashedPassword: 'hashedPassword',
      },
    },
    two: {
      data: {
        id: 2,
        username: 'String8581580',
        salt: 'salt',
        hashedPassword: 'hashedPassword',
        secret_phrase: "already set up"
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
