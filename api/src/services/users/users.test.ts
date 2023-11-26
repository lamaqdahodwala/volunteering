import type { User } from '@prisma/client'

import type { StandardScenario } from './users.scenarios'
import { doesUserHaveSecretPhraseSetUp } from './users'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('doesUserHaveSecretPhraseSetUp', () => {
  scenario(
    'returns true if if the secret phrase is set',
    async (scenario: StandardScenario) => {
      mockCurrentUser({
          id: 2,
          username: '',
          roles: ''
      })
      let result = await doesUserHaveSecretPhraseSetUp()

      expect(result).toBe(true)
    }
  )
  scenario(
    "returns false if it isn't set",
    async (scenario: StandardScenario) => {
      mockCurrentUser({
          id: 1,
          username: '',
          roles: ''
      })
      let result = await doesUserHaveSecretPhraseSetUp()
      expect(result).toBe(false)
    }
  )
})

