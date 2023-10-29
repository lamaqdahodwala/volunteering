import { Link } from "@redwoodjs/router"
import { useMutation, useQuery } from "@redwoodjs/web"
import { FC, useState } from "react"
import { Tooltip } from "react-tooltip"

interface TagProps {
  name: string
  description: string
  id: number
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
  const {loading, error, data} = useQuery(CHECK_IF_IM_WATCHING_TAG, {
    variables: {id: props.id}
  })

  const [watchTagFunction] = useMutation(WATCH_TAG_MUTATION, {
    refetchQueries: [ CHECK_IF_IM_WATCHING_TAG ]
  })
const [ unwatchTagFunction ] = useMutation(UNWATCH_TAG_MUTATION, {
  refetchQueries: [CHECK_IF_IM_WATCHING_TAG]
  })

  function toggleWatchState() {
    if (data.doIWatchTag === true) {
      unwatchTagFunction({ variables: {id: props.id}})
      return
    }

    watchTagFunction({ variables: {id: props.id}})
    return

  }

  return (
    <div>

      <div id={String(props.name).toLowerCase()} className="badge badge-info" >
      {props.name}
      </div>

      <Tooltip anchorSelect={"#" + String(props.name).toLowerCase()} clickable>
<div className="flex flex-col gap-2">
      <p className="w-64">{props.description.length >= 100 ? props.description.substring(0, 100) + "..." : props.description}</p>
      <Link to="home" className="text-sm uppercase text-info link">More</Link>

      {data?.doIWatchTag === true && !loading ? (
      <button className="btn btn-error" onClick={() => toggleWatchState()}>Unwatch Tag</button>
      ): ( <button className="btn btn-success" onClick={() => toggleWatchState()}>Watch Tag</button> )}</div>
      </Tooltip>
    </div>
  )
}

export default Tag
