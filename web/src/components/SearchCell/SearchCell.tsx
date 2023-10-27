import type { FindSearchQuery, FindSearchQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RecommendedItem from '../RecommendedItem/RecommendedItem'

export const QUERY = gql`
  query FindSearchQuery($query: String!) {
    search: search(query: $query) {
      title
      manager {
        username
      }

      max_signups
      id
      description
    }
  }
`
export const beforeQuery = ({ query }) => {
  return {
    variables: { query }
  }
}

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
  return (
    {search.map((val) => <RecommendedItem {...val}></RecommendedItem> )}
  )
}
