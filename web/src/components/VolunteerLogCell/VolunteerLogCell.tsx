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
        duration
      }
      completed
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Nothing here yet. <Link to={routes.home()} className='link'>Volunteer now!</Link></div>

export const Failure = ({
  error,
}: CellFailureProps<FindVolunteerLogQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  volunteerLog,
}: CellSuccessProps<FindVolunteerLogQuery, FindVolunteerLogQueryVariables>) => {
  return <div>{JSON.stringify(volunteerLog)}</div>
}
