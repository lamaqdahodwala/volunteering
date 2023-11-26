import type { Tag } from '@prisma/client'

import type { StandardScenario } from './tags.scenarios'
import { doIWatchTag, myWatchedTags, searchTags } from './tags'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

// describe('tags', () => {
//   scenario('returns all tags', async (scenario: StandardScenario) => {
//     const result = await tags()
//
//     expect(result.length).toEqual(Object.keys(scenario.tag).length)
//   })
// })
//
describe('myWatchedTags', () => {
  scenario(
    'returns the tags that a user watches',
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 2})
      let result = await myWatchedTags()
      expect(result).toEqual([scenario.tag.two])
    }
  )
  scenario(
    'returns an empty list if there are no watched tags',
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 1 })
      let result = await myWatchedTags()
      expect(result).toEqual([])
    }
  )
})

describe("searchTags", () => {
  scenario("searches for a query that only matches one tag", async(scenario: StandardScenario) => {
    let result = await searchTags({ name: "Health"})
    expect(result).toEqual([ scenario.tag.one ])
  })

  scenario("searches for a query that matches multiple tags", async(scenario: StandardScenario) => {
    let result = await searchTags({ name: "care" })
    expect(result).toEqual([ scenario.tag.one, scenario.tag.three])
  })
})

describe("doIWatchTag", () => {
  scenario("check to see if a user watches a certain tag", async(scenario: StandardScenario) => {
    mockCurrentUser({id: 2})
    let result1 = await doIWatchTag({ id: 1 })
    let result2 = await doIWatchTag({ id: 2 })
    let result3 = await doIWatchTag({ id: 3 })
    expect(result1).toBe(false)
    expect(result2).toBe(true)
    expect(result3).toBe(false)
  })
})


