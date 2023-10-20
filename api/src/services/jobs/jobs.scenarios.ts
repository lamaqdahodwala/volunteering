import type { Prisma, Job } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.JobCreateArgs>({
  job: {
    one: {
      data: {
        title: 'String',
        description: 'String',
        max_signups: 2647526,
        minimum_age: 1236127,
        manager: { create: { username: 'String4203165' } },
      },
    },
    two: {
      data: {
        title: 'String',
        description: 'String',
        max_signups: 8514952,
        minimum_age: 2965536,
        manager: { create: { username: 'String2197348' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Job, 'job'>
