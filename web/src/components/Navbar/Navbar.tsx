import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

const Navbar = () => {
  let auth = useAuth()

  return (
    <div>
      {auth.isAuthenticated ? (
        <div className="flex flex-row gap-3">
          <Link to={routes.home()}>Discover</Link>
          <Link to={routes.schedule()}>Schedule</Link>
          <Link to={routes.volunteerLog()}>Volunteer Log</Link>
        </div>
      ) : (
        <div>
          <Link className="link" to={routes.login()}>Log in</Link>
          <Link className="link" to={routes.signup()}>Sign up</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
