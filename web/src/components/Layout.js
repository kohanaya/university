import { Link, Outlet } from 'react-router-dom'
import { React } from 'react'

export function Layout () {
  return (
    <>
      <h2>University Management App</h2>
      <nav>
        <Link to='/'>Home</Link> |{' '}
        <Link to='/courses'>Courses</Link> |{' '}
        <Link to='/students'>Students</Link> |{' '}
      </nav>
      <hr />
      <Outlet />
      <br /><br /><br /><br /><br />
      <hr />
      <div>Created by Kakhanouskaya Hanna. SEMO.</div>
    </>
  )
}
