import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import JobDetailCell from 'src/components/JobDetailCell/JobDetailCell'

const JobDetailPage = ({ id }) => {
  return (
    <>
      <MetaTags title="JobDetail" description="JobDetail page" />

      <JobDetailCell id={id}></JobDetailCell>
    </>
  )
}

export default JobDetailPage
