import { Link } from '@redwoodjs/router'

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
        <div className="flex flex-row gap-3">
          <Link to="/">Discover</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/">Volunteer Log</Link>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default NavbarLayout
