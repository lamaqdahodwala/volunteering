import type { Signup } from '@prisma/client'

import { signups } from './signups'
import type { StandardScenario } from './signups.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('signups', () => {
  scenario('returns all signups', async (scenario: StandardScenario) => {
    const result = await signups()

    expect(result.length).toEqual(Object.keys(scenario.signup).length)
  })
})
