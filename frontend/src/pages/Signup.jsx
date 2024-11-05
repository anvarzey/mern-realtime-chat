import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function SignupPage () {
  const { signUp, user } = useAuth()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState([])

  useEffect(() => {
    if (user) {
      navigate('/chat')
    }
  }, [navigate, user])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    if (!name.length || !username.length || !password.length || !confirmPassword.length) {
      if (!name.length) {
        setError(prev => [...prev, 'Name is missing'])
      }

      if (!username.length) {
        setError(prev => [...prev, 'Username is missing'])
      }

      if (!password.length) {
        setError(prev => [...prev, 'Password is missing'])
      }

      if (!confirmPassword.length) {
        setError(prev => [...prev, 'Confirm password is missing'])
      }
    } else {
      if (password !== confirmPassword) {
        setError(prev => [...prev, 'Passwords must match'])

        return
      }

      const res = await signUp({ name, username, password, confirmPassword })
        .catch(err => console.error({ error: err }))

      if (res && Object.hasOwn(res, 'error')) {
        setError(res.error)
      } else {
        navigate('/chat')
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
          <h1 className="card-title text-4xl mb-4">Sign up</h1>
          <p>
            Create your account to chat with amazing people!
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
          <div className="mb-8 space-y-4">
            <div className='form-control'>
              <label htmlFor="name" className="label label-text">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                onChange={handleName}
                value={name}
              />
            </div>
            <div className='form-control'>
              <label htmlFor="username" className="label label-text">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="input input-bordered w-full"
                onChange={handleUsername}
                value={username}
              />
            </div>
            <div className='form-control'>
              <label htmlFor="password" className="label label-text">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input input-bordered w-full"
                onChange={handlePassword}
                value={password}
              />
            </div>
            <div className='form-control'>
              <label htmlFor="confirmPassword" className="label label-text">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="input input-bordered w-full"
                onChange={handleConfirmPassword}
                value={confirmPassword}
              />
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
                  : 'Sign up'
              }
            </button>
            <div className="flex items-center justify-center gap-2">
              <span>Already registered?</span>
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
