import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwriteReasouces/auth_service';
import {login, logout} from './features/authentication/authslice'
import './App.css'
import Header  from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
          <Outlet />
        <Footer />
      </div>
    </div>
  ) : null
}

export default App