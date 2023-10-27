import { IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const SearchBar = () => {
  const [search, setSearch] = useState("")

  return (
      <div className="p-2 border border-1 border-neutral focus-within:border-neutral-content rounded-full w-full">

      <form action="/search" method="GET">
        <div className="flex flex-row gap-3">
          <button type="submit"><IconSearch></IconSearch></button>
          <input type="text" placeholder="What do you want to do today?" className="w-full bg-base-100 focus:outline-none"  onChange={(event) => setSearch(event.target.value)} name="query"></input>
        </div>
      </form>

      </div>
  )
}

export default SearchBar
