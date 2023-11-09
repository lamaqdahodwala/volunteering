import { Link, routes } from '@redwoodjs/router'
import VolunteerLogCell from 'src/components/VolunteerLogCell/VolunteerLogCell'
import { MetaTags } from '@redwoodjs/web'

const VolunteerLogPage = () => {
  return (
    <>
      <MetaTags title="VolunteerLog" description="VolunteerLog page" />

      <VolunteerLogCell></VolunteerLogCell>
    </>
  )
}

export default VolunteerLogPage
