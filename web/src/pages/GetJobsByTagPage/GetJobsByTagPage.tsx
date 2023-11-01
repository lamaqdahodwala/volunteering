import GetJobsByTagCell from 'src/components/GetJobsByTagCell/GetJobsByTagCell'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const GetJobsByTagPage = ({ id }) => {
  return (
    <>
      <MetaTags title="GetJobsByTag" description="GetJobsByTag page" />

      <GetJobsByTagCell id={id}></GetJobsByTagCell>
    </>
  )
}

export default GetJobsByTagPage
