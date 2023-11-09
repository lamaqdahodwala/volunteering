import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import SearchTagManager from '../SearchTagManager/SearchTagManager'

const SearchBar = () => {
  const [tags, setTags] = useState([])

  const tagStateHandler = (data) => setTags(data)

  return (
    <div className="border-1 w-1/3 rounded-full border border-neutral p-2 focus-within:border-neutral-content">
      <form action="/search" method="GET" className="w-full">
        <div className="flex flex-row gap-3">
          <button type="submit">
            <IconSearch></IconSearch>
          </button>
          <input
            type="text"
            className="w-full bg-base-100 focus:outline-none "
            name="query"
          ></input>
          <input type="text" hidden={true} value={String(tags)} name="tags"/>
        </div>
      </form>
      <details className="dropdown">
        <summary className="btn btn-ghost btn-sm">Tags</summary>
        <ul className="dropdown-content z-10 w-36 space-y-1 bg-base-200 p-2">
          {tags.map((val, index) => (
            <li className="w-full" key={index}>
              <p>{val}</p>
            </li>
          ))}
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById('tag_modal').showModal()}
          >
            Add new
          </button>
        </ul>
      </details>
      <dialog className="modal" id="tag_modal">
        <div className="modal-box">
          <SearchTagManager handler={tagStateHandler}></SearchTagManager>

        </div>
      </dialog>
    </div>
  )
}

export default SearchBar
