import type {
  FindScheduleQuery,
  FindScheduleQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindScheduleQuery {
    schedule: viewUpcomingJobs {
      id
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

}
