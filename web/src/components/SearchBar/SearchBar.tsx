import { IconSearch } from "@tabler/icons-react"

const SearchBar = () => {

  return (
      <div className="p-2 border border-1 border-neutral focus-within:border-neutral-content rounded-full w-1/3">

      <form action="/search" method="GET" className="w-full">
        <div className="flex flex-row gap-3">
          <button type="submit"><IconSearch></IconSearch></button>
          <input type="text" placeholder="What do you want to do today?" className="w-full bg-base-100 focus:outline-none "  name="query"></input>
        </div>
      </form>

      </div>
  )
}

export default SearchBar
