import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import RecommendedCell from 'src/components/RecommendedCell/RecommendedCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <RecommendedCell></RecommendedCell>
    </>
  )
}

export default HomePage
