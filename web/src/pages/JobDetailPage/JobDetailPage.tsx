import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const JobDetailPage = () => {
  return (
    <>
      <MetaTags title="JobDetail" description="JobDetail page" />

      <h1>JobDetailPage</h1>
      <p>
        Find me in <code>./web/src/pages/JobDetailPage/JobDetailPage.tsx</code>
      </p>
      <p>
        My default route is named <code>jobDetail</code>, link to me with `
        <Link to={routes.jobDetail()}>JobDetail</Link>`
      </p>
    </>
  )
}

export default JobDetailPage
