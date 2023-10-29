import type {
  FindJobDetailQuery,
  FindJobDetailQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Tag from '../Tag/Tag'

export const QUERY = gql`
  query FindJobDetailQuery($id: Int!) {
    jobDetail: jobDetail(id: $id) {
      id
      title
      description
      datetime
      max_signups
      minimum_age
      tags {
        name
        id
        description
      }
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

export const beforeQuery = (props) => {
  return {
    variables: {
      id: Number(props.id)
    }
  }
}
export const Success = ({
  jobDetail,
}: CellSuccessProps<FindJobDetailQuery, FindJobDetailQueryVariables>) => {
  return <div>
    <h1 className="text-2xl font-bold">{jobDetail.title}</h1>
    <div className="flex flex-row gap-3">{jobDetail.tags.map((val, index) => <div><Tag {...val} key={index}></Tag></div> )}</div>
    <div className="divider"></div>
    <p>{jobDetail.description}</p>
  </div>
}
