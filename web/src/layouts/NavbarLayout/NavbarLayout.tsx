import { Link, routes } from '@redwoodjs/router'
import Navbar from 'src/components/Navbar/Navbar'
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
        <Navbar></Navbar>
      </nav>
      <div className="px-3">{children}</div>
    </div>
  )
}

export default NavbarLayout
