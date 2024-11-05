import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function LoginPage () {
  const { login, user } = useAuth()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/chat')
    }
  }, [navigate, user])

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    if (username.length && password.length) {
      const res = await login({ username, password })
        .catch(err => console.error({ error: err }))

      if (res && Object.hasOwn(res, 'error')) {
        setError(res.error)
      } else {
        navigate('/chat')
      }
    } else {
      if (!username.length) {
        setError(prev => [...prev, 'Username is missing'])
      }

      if (!password.length) {
        setError(prev => [...prev, 'Password is missing'])
      }
    }

    setIsLoading(false)

  }

  useEffect(() => {
    if (error.length) {
      setTimeout(() => {
        setError([])
      }, 5000)
    }

    return
  }, [error])

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl">
      <div className="card-body space-y-6">
        <div>
          <h1 className="card-title text-4xl mb-4">Login</h1>
          <p>
            Login to your account to chat with amazing people!
          </p>
        </div>
        {
          error.length > 0 ?
            (
              <div className="toast toast-end">
                {
                  error.map((err, i) => (
                    <div className="alert alert-error" key={i}>
                      <span>{err}</span>
                    </div>
                  ))
                }
              </div>
            )
            : <></>
        }
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            <div className='form-control'>
              <label className="label label-text" htmlFor='username'>
                Username
              </label>
              <input id='username' type="text" className="input input-bordered w-full" onChange={handleUsername} value={username} />
            </div>
            <div className='form-control'>
              <label className="label label-text" htmlFor='password'>
                Password
              </label>
              <input id='password' type="password" className="input input-bordered w-full" onChange={handlePassword} value={password} />
            </div>
          </div>
          <div className="card-actions flex-col items-center gap-2">
            <button
              className="btn btn-primary block w-full"
              type='submit'
              disabled={isLoading}
            >
              {
                isLoading
                  ? <span className='loading loading-spinner' />
                  : 'Login'
              }
            </button>
            <div className="flex items-center justify-center gap-2">
              <span>Don&apos;t have an account?</span>
              <Link to="/signup" className="link">
                Sign up
              </Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
