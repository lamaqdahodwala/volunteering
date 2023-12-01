import type { Prisma, Job } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<
  Prisma.JobCreateArgs | Prisma.UserCreateArgs,
  'job' | 'user'
>({
  tag: {
    one: {
      data: {
        id: 1,
        name: 'Health',
        description: 'Placeholder',
      },
    },
    two: {
      data: {
        id: 2,
        name: 'Science',
        description: 'Placeholder',
      },
    },
  },
  user: {
    one: {
      data: {
        username: 'jfk high school',
        id: 1,
        roles: 'business',
        hashedPassword: 'pass',
        salt: 'salt',
      },
    },
  },
  job: {
    one: {
      data: {
        title: 'RWJ Hospital',
        description: 'String',
        max_signups: 2647526,
        datetime: new Date(),
        minimum_age: 1236127,
        manager: { connect: { id: 1 } },
        tags: {
          connect: {
            id: 1,
          },
        },
      },
    },
    two: {
      data: {
        title: 'RWJ Science research lab',
        description: 'String',
        max_signups: 8514952,
        minimum_age: 2965536,
        datetime: new Date(),
        manager: { connect: { id: 1 } },
        tags: {
          connect: [
            {
              id: 1,
            },
            { id: 2 },
          ],
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Job, 'job'>
