import type { Prisma, Signup } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SignupCreateArgs>({
  signup: {
    one: {
      data: {
        on_job: {
          create: {
            title: 'String',
            description: 'String',
            max_signups: 6008520,
            minimum_age: 6472605,
            manager: {
              create: {
                username: 'String6779018',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        for_user: {
          create: {
            username: 'String5873638',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        on_job: {
          create: {
            title: 'String',
            description: 'String',
            max_signups: 4262189,
            minimum_age: 5067457,
            manager: {
              create: {
                username: 'String70722',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        for_user: {
          create: {
            username: 'String9686975',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Signup, 'signup'>
