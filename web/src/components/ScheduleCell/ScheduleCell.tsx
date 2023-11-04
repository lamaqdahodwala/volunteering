import type {
  FindScheduleQuery,
  FindScheduleQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RecommendedItem from '../RecommendedItem/RecommendedItem'
import { Link, routes } from '@redwoodjs/router'
import { DateTime } from 'luxon'

export const QUERY = gql`
  query FindScheduleQuery {
    schedule: viewUpcomingJobs {
      id
      on_job {
        id
        title
        manager {
          username
        }
        datetime
        tags {
          name
          description
          id
        }
        max_signups
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindScheduleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  schedule,
}: CellSuccessProps<FindScheduleQuery, FindScheduleQueryVariables>) => {
  return (
    <div className="w-full px-32 py-2 space-y-3">
      {schedule.map((val) => {
        let job = val.on_job
        return (
          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title">{DateTime.fromISO( job.datetime ).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</h1>
              <Link
                to={routes.jobDetail({ id: String(job.id) })}
                className="link text-info"
              >
                {job.title}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
  // return (
  // <>{JSON.stringify( schedule )}</>
  // )
}
