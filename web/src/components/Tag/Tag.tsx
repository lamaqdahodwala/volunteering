import { Link } from "@redwoodjs/router"
import { useQuery } from "@redwoodjs/web"
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
const Tag: FC<TagProps> = (props) => {
  const {loading, error, data} = useQuery(CHECK_IF_IM_WATCHING_TAG, {
    variables: {id: props.id}
  })

  return (
    <div>

      <div id="tag_item" className="badge badge-info" >
      {props.name}
      </div>

      <Tooltip anchorSelect="#tag_item" clickable>
<div className="flex flex-col gap-2">
      <p className="w-64">{props.description.length >= 100 ? props.description.substring(0, 100) + "..." : props.description}</p>
      <Link to="home" className="text-sm uppercase text-info link">More</Link>
      {data === true ? (
      <button className="btn btn-error">Unwatch Tag</button>
      ): ( <button className="btn btn-success">Watch Tag</button> )}</div>
      </Tooltip>
    </div>
  )
}

export default Tag
