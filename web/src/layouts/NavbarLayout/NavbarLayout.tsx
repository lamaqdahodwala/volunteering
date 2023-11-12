import { Link, routes } from '@redwoodjs/router'
import SearchBar from 'src/components/SearchBar/SearchBar'

type NavbarLayoutProps = {
  children?: React.ReactNode
}

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  return (
    <div>
      <nav className="navbar justify-between px-3">
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          Home
        </Link>

        <SearchBar></SearchBar>
        <div className="flex flex-row gap-3">
          <Link to={routes.home()}>Discover</Link>
          <Link to={routes.schedule()}>Schedule</Link>
          <Link to={routes.volunteerLog()}>Volunteer Log</Link>
        </div>
      </nav>
      <div className="px-3">{children}</div>
    </div>
  )
}

export default NavbarLayout
