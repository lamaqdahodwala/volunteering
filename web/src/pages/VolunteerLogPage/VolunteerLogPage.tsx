import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const VolunteerLogPage = () => {
  return (
    <>
      <MetaTags title="VolunteerLog" description="VolunteerLog page" />

      <h1>VolunteerLogPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/VolunteerLogPage/VolunteerLogPage.tsx</code>
      </p>
      <p>
        My default route is named <code>volunteerLog</code>, link to me with `
        <Link to={routes.volunteerLog()}>VolunteerLog</Link>`
      </p>
    </>
  )
}

export default VolunteerLogPage
