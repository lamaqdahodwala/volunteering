import { Link, routes } from '@redwoodjs/router'
import SearchCell from 'src/components/SearchCell/SearchCell'
import { MetaTags } from '@redwoodjs/web'

const SearchPage = () => {
  return (
    <>
      <MetaTags title="Search" description="Search page" />

      <SearchCell></SearchCell>
    </>
  )
}

export default SearchPage
