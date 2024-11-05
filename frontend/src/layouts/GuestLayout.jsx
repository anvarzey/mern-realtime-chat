import { Outlet } from 'react-router-dom'

export default function GuestLayout () {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
