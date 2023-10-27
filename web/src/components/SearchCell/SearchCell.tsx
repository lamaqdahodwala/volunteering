import type { FindSearchQuery, FindSearchQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindSearchQuery($id: Int!) {
    search: search(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSearchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  search,
}: CellSuccessProps<FindSearchQuery, FindSearchQueryVariables>) => {
  return <div>{JSON.stringify(search)}</div>
}
