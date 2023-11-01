import type {
  FindGetJobsByTagQuery,
  FindGetJobsByTagQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RecommendedItem from '../RecommendedItem/RecommendedItem'

export const QUERY = gql`
  query FindGetJobsByTagQuery($id: Int!) {
    getJobsByTag: getJobsByTag(tag_id: $id) {
      id
      title
      description
      manager {
        username
      }
      max_signups
      tags {
        id
        name
        description
      }
    }

    tagInfo(tag_id: $id) {
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const beforeQuery = (props) => {
  return {
    variables: {
      id: Number(props.id)
    }
  }
}

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGetJobsByTagQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  getJobsByTag,
  tagInfo
}: CellSuccessProps<FindGetJobsByTagQuery, FindGetJobsByTagQueryVariables>) => {
  return <div>
    {getJobsByTag.map((val, index) => (
      <>
        <h1 className='text-2xl '>Searching for jobs tagged <span className='badge badge-info'>{tagInfo.name}</span></h1>
        <br/>
        <RecommendedItem {...val} key={index}></RecommendedItem>
      </>
    ))}
  </div>
}
