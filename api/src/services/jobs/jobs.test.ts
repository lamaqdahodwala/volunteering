import type { Job } from '@prisma/client'

import type { StandardScenario } from './jobs.scenarios'
import { recommended_jobs, search } from './jobs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

// describe('jobs', () => {
//   scenario('returns all jobs', async (scenario: StandardScenario) => {
//     const result = await jobs()
//
//     expect(result.length).toEqual(Object.keys(scenario.job).length)
//   })
// })
//
describe("search", () => {
  scenario("searches for a keyword", async(scenario) => {
    let result = await search({query: "Hospital"})
    expect(result).toEqual([ scenario.job.one ])
    expect(result).toHaveLength(1)
  })

  scenario("searches for a keyword where there are multiple results", async(scenario) => {
    let result = await search({query: "RWJ"})
    expect(result).toEqual([ scenario.job.one, scenario.job.two ])
    expect(result).toHaveLength(2)
  })

  scenario("searches by tag", async(scenario) => {
    let result = await search({tags: "2"})
    expect(result).toEqual([scenario.job.two])
    expect(result).toHaveLength(1)
  })
  scenario("searches by tag where there are multiple results", async(scenario) => {
    let result = await search({tags: "1"})
    expect(result).toEqual([scenario.job.one, scenario.job.two])
    expect(result).toHaveLength(2)
  })

  scenario("searches by tag where there are multiple tags", async(scenario) => {
    let result = await search({tags: "1,2"})
    expect(result).toEqual([scenario.job.two])
    expect(result).toHaveLength(1)
  })

  scenario("search by tag and query", async(scenario) => {
    let result = await search({query: "hospital", tags:"2"})
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })
})

describe("recommended_jobs", () => {
  scenario("recommends jobs that have tags you watch", async(scenario) => {
    mockCurrentUser({id: 1})
    let result = await recommended_jobs()
    expect(result).toEqual([scenario.job.two])

  })

  scenario("does not recommend jobs that don't share any tags", async(scenario) => {
    mockCurrentUser({id: 3})
    let result = await recommended_jobs()
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  scenario("returns all jobs if you have no watched tags", async(scenario) => {
    mockCurrentUser({id: 4})
    let result = await recommended_jobs()
    expect(result).toHaveLength(2)
  })
})
