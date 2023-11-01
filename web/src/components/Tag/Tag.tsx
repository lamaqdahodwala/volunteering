import { Link } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { FC, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

interface TagProps {
  name: string
  description: string
  id: number
  tag?: string
}
const CHECK_IF_IM_WATCHING_TAG = gql`
  query AmIWatchingTag($id: Int!) {
    doIWatchTag(id: $id)
  }
`
const WATCH_TAG_MUTATION = gql`
  mutation WatchTagMutation($id: Int!) {
    watchTag(id: $id) {
      name
      id
      description
    }
  }
`
const UNWATCH_TAG_MUTATION = gql`
  mutation UnwatchTagMutation($id: Int!) {
    unwatchTag(id: $id) {
      name
      id
      description
    }
  }
`

const Tag: FC<TagProps> = (props) => {
  const { loading, error, data } = useQuery(CHECK_IF_IM_WATCHING_TAG, {
    variables: { id: props.id },
  })

  const [watchTagFunction] = useMutation(WATCH_TAG_MUTATION, {
    refetchQueries: [CHECK_IF_IM_WATCHING_TAG],
  })
  const [unwatchTagFunction] = useMutation(UNWATCH_TAG_MUTATION, {
    refetchQueries: [CHECK_IF_IM_WATCHING_TAG],
  })

  function toggleWatchState() {
    if (data.doIWatchTag === true) {
      unwatchTagFunction({ variables: { id: props.id } })
      return
    }

    watchTagFunction({ variables: { id: props.id } })
    return
  }

  let random_number = Math.floor(Math.random() * 1000)
  let first_letter = props.name.charAt(0)

  let id_name = useRef(`${first_letter}${random_number}`)

  let tooltip_placement = props.tag ? props.tag : "bottom"

  return (
    <div>
      <div id={id_name.current} className="badge badge-info">
        {props.name}
      </div>

      <Tooltip anchorSelect={`#${id_name.current}`} clickable place={tooltip_placement}>
        <div className="flex flex-col gap-2">
          <p className="w-64">
            {props.description.length >= 100
              ? props.description.substring(0, 100) + '...'
              : props.description}
          </p>
          <Link
            to={`/tag/${props.id}`}
            className="link text-sm uppercase text-info"
          >
            More
          </Link>

          {data?.doIWatchTag === true && !loading ? (
            <button
              className="btn btn-error"
              onClick={() => toggleWatchState()}
            >
              Unwatch Tag
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => toggleWatchState()}
            >
              Watch Tag
            </button>
          )}
        </div>
      </Tooltip>
    </div>
  )
}

export default Tag
