import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { username: 'String8498567' } },
    two: { data: { username: 'String8581580' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
