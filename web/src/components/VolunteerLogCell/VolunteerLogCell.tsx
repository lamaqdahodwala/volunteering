import type {
  FindVolunteerLogQuery,
  FindVolunteerLogQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindVolunteerLogQuery {
    volunteerLog: viewVolunteerLog {
      id
      on_job {
        id
        duration
        title
        datetime
      }
      completed
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div>
    Nothing here yet.{' '}
    <Link to={routes.home()} className="link">
      Volunteer now!
    </Link>
  </div>
)

export const Failure = ({
  error,
}: CellFailureProps<FindVolunteerLogQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  volunteerLog,
}: CellSuccessProps<FindVolunteerLogQuery, FindVolunteerLogQueryVariables>) => {
  return (
    <div className="space-y-3">
      {volunteerLog.map((signup, index) => (
        <div key={index} className="card bg-base-300">
          <div className="card-body">
            <Link to={routes.jobDetail({ id: signup.on_job.id})} className="card-title link">{signup.on_job.title}</Link>
            <p>
              <ul>
                <li>Hours: {signup.on_job.duration}</li>
                <li>Completed on: {signup.on_job.datetime}</li>
              </ul>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
