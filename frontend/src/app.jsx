import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import ChatPage from './pages/Chat'
import GuestLayout from './layouts/GuestLayout'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/Home'


export default function App () {
  return (
    <Routes>
      <Route path='/' element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Route>
      <Route path='/chat' element={<AppLayout />}>
        <Route index element={<ChatPage />} />
      </Route>
    </Routes>
  )
}
