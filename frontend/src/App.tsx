import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './components/Header'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './store/userSlice'
import type { AppDispatch, RootState } from './store/store'
import MyOrders from './pages/MyOrders'

function App() {

  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((store : RootState)=> store.user.user)

  useEffect(()=>{
    dispatch(fetchUser())
  },[])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={user ? <Navigate to={"/"} /> : <LoginPage />}/>
        <Route path='/register' element={user ? <Navigate to={"/"}/> : <RegisterPage />} />
        <Route path='/orders' element={user ? <MyOrders /> : <Navigate to={"/"}/>}/>
      </Routes>
    </>
  )
}

export default App
