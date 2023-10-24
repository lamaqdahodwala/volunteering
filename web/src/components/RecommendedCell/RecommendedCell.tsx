import type {
  FindRecommendedQuery,
  FindRecommendedQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindRecommendedQuery {
    recommended: recommended_jobs {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRecommendedQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  recommended,
}: CellSuccessProps<FindRecommendedQuery, FindRecommendedQueryVariables>) => {
  return <div>{JSON.stringify(recommended)}</div>
}
