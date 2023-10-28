import type {
  FindJobDetailQuery,
  FindJobDetailQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindJobDetailQuery($id: Int!) {
    jobDetail: jobDetail(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindJobDetailQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  jobDetail,
}: CellSuccessProps<FindJobDetailQuery, FindJobDetailQueryVariables>) => {
  return <div>{JSON.stringify(jobDetail)}</div>
}
