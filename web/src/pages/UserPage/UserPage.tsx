import { Link, routes } from '@redwoodjs/router'
import UserCell from 'src/components/UserCell/UserCell'
import { MetaTags } from '@redwoodjs/web'

const UserPage = ({ id }) => {
  return (
    <>
      <MetaTags title="User" description="User page" />

      <UserCell id={Number( id )}></UserCell>
    </>
  )
}

export default UserPage
