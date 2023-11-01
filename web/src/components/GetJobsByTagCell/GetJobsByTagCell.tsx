import type {
  FindGetJobsByTagQuery,
  FindGetJobsByTagQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindGetJobsByTagQuery($id: Int!) {
    getJobsByTag: getJobsByTag(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGetJobsByTagQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  getJobsByTag,
}: CellSuccessProps<FindGetJobsByTagQuery, FindGetJobsByTagQueryVariables>) => {
  return <div>{JSON.stringify(getJobsByTag)}</div>
}
