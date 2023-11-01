import type {
  FindRecommendedQuery,
  FindRecommendedQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RecommendedItem from '../RecommendedItem/RecommendedItem'

export const QUERY = gql`
  query FindRecommendedQuery {
    recommended: recommended_jobs {
      id
      title
      description
      manager {
        username
      }
      max_signups
      tags {
        description
        name
        id
      }

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
  return <div className="space-y-4">
    {recommended.map((val, index) =>
      <RecommendedItem {...val} key={index}></RecommendedItem>

    )}
  </div>
}
