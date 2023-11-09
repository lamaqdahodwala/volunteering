import { useLazyQuery } from '@apollo/client'
import { FC, useEffect, useState } from 'react'

interface Props {
  handler: Function
}
const SEARCH_FOR_TAGS = gql`
  query SearchForTag($name: String!) {
    searchTags(name: $name) {
      id
      name
      description
    }
  }
`
const SearchTagManager: FC<Props> = ({ handler }) => {
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [queryFunction, { loading, error, data }] =
    useLazyQuery(SEARCH_FOR_TAGS)
  useEffect(() => {
    queryFunction({
      variables: {
        name: tagInput,
      },
    })
  }, [tagInput])

  function addTagToList(tag_id: number) {
    if (tags.length === 5) return
    setTags([...tags, tag_id])
  }

  function checkIfTagIsInAdded(tag_id: number) {
    return tags.includes(tag_id)
  }

  function removeTagFromList(tag_id: number) {
    let index_of_tag = tags.indexOf(tag_id)
    let new_tags = tags.splice(index_of_tag, 1)

    setTags([...tags ])
  }

  function saveTags() {
    handler(tags)
  }
  return (
    <div className="space-y-3">
      <h1 className="text-2xl">Add a tag</h1>
      {tags.map((val, index) => (
        <div key={index}>
          <p>{val}</p>
        </div>
      ))}
      <input
        type="text"
        className="border-1 input w-full border border-neutral focus:border-accent focus:outline-none"
        onChange={(event) => setTagInput(event.target.value)}
      />
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      {data && (
        <div className="space-y-3">
          {data.searchTags.map((val, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between rounded-lg bg-base-300 p-3"
            >
              <p>{val.name}</p>
              {checkIfTagIsInAdded(val.id) ? (
                <button onClick={() => removeTagFromList(val.id)}>Remove me</button>
              ) : (
                <button onClick={() => addTagToList(val.id)}>Add me</button>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row justify-end gap-2">
        <button className="btn btn-success btn-outline">Save</button>
      </div>
    </div>
  )
}

export default SearchTagManager
