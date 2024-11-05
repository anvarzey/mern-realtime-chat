import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { FaVectorSquare } from 'react-icons/fa6'

export default function HomePage () {
  const { user } = useAuth()

  return (
    <>
      <h1 className="text-5xl mb-4 font-bold flex flex-col items-center gap-4">
        <FaVectorSquare className='h-16 w-auto text-emerald-400 animate-spin-slow' />
        <div>React Realtime</div>
      </h1>
      <p className="mb-8">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. A asperiores
        eius atque, odio suscipit repellendus non veniam recusandae maxime
        nihil!
      </p>
      {
        user
          ? (
            <Link to='/chat' className='btn btn-primary'>
              Go to chat
            </Link>
          )
          : (
            <div className="flex flex-col gap-4">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Sign up
              </Link>
            </div>
          )
      }
    </>
  )
}
