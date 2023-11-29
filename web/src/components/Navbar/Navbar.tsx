import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

interface CurrentUser {
  id: number
  username?: string
}

interface Auth {
  isAuthenticated: boolean
  currentUser: CurrentUser | null
}

const Navbar = () => {
  const auth = useAuth()

  const isAuthenticated: boolean = auth?.isAuthenticated || false
  const currentUser: CurrentUser | null = auth?.currentUser || null

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex flex-row gap-3">
          <Link className="p-1" to={routes.home()}>Discover</Link>
          <Link className="p-1" to={routes.schedule()}>Schedule</Link>
          <Link className="p-1" to={routes.volunteerLog()}>Volunteer Log</Link>
          {currentUser && currentUser.username && (
            <Link className="p-1" to={routes.user({ id: String(currentUser.id) })}>
              <p className='text-info border border-1 p-1 rounded-lg border-neutral'>{currentUser.username}</p>
            </Link>
          )}
        </div>
      ) : (
        <div>
          <Link className="link" to={routes.login()}>
            Log in
          </Link>
          <Link className="link" to={routes.signup()}>
            Sign up
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
