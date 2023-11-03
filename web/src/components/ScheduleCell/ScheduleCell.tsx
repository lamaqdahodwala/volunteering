import type {
  FindScheduleQuery,
  FindScheduleQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RecommendedItem from '../RecommendedItem/RecommendedItem'
import { Link, routes } from '@redwoodjs/router'

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
    <>
      {schedule.map((val) => {
        let job = val.on_job
        return (
          <div className="card bg-base-300">
            <h1 className="card-title">{job.datetime}</h1>
            <div className="card-content">
              <Link to={routes.jobDetail({id: String( job.id )})} className="link">{job.title}</Link>
            </div>
          </div>
        )
      })}
    </>
  )
  // return (
  // <>{JSON.stringify( schedule )}</>
  // )
}
