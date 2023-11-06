import type { FindSearchQuery, FindSearchQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RecommendedItem from '../RecommendedItem/RecommendedItem'
import { useLocation } from '@redwoodjs/router'

export const QUERY = gql`
  query FindSearchQuery($query: String!) {
    search: search(query: $query) {
      title
      manager {
        username
      }

      max_signups
      id
      tags {
        id
        name
        description
      }
      description
    }
  }
`
export const beforeQuery = () => {
  let location = useLocation()

  let params = new URLSearchParams(location.search)

  let query = params.get("query")
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

export const Success = ({ search }: CellSuccessProps<FindSearchQuery, FindSearchQueryVariables>) => {
  return (
    <div>{search.map((val, index) => <RecommendedItem {...val} key={index}></RecommendedItem> )}</div>
  )
}
