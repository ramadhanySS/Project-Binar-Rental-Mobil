import React from 'react'
import Home from '../Pages/Home'
import Search from '../Pages/Search'
import Details from '../Pages/Details'
import Result from '../Pages/Result'
import NotFound from '../Pages/NotFound'
import UserLogin from '../Pages/UserLogin'
import AdminLogin from '../Pages/AdminLogin'
import Admin from '../Pages/Admin'
import AdminListCar from '../Pages/ListCar'
import AddCar from '../Pages/AddCar'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import PrivateRouter from './PrivateRouter'
import AdminPrivateRouter from './AdminPrivateRoute'

export default function Router() {
  let userLoginProps = {
    title: "Welcome Back!",
    button: "Sign In",
    text: ["Don’t have an account?", "Sign Up for free", "/register"],
    login: true
  }

  let userRegisProps = {
    title: "Sign Up",
    button: "Sign Up",
    text: ["Already have an account?", "Sign In here", "/login"],
    login: false
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter></PrivateRouter>}>
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/details" element={<Details />} />
          <Route exact path="/result" element={<Result />} />
        </Route>
        <Route element={<AdminPrivateRouter></AdminPrivateRouter>}>
          <Route exact path="/admin" element={<Admin></Admin>} />
          <Route exact path="/admin/list" element={<AdminListCar></AdminListCar>} />
          <Route exact path="/admin/list/add" element={<AddCar></AddCar>} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path ="/login" element={<UserLogin {...userLoginProps}/>} />
        <Route exact path ="/register" element={<UserLogin {...userRegisProps}/>} />
        <Route exact path="/admin/login" element={<AdminLogin />}/>
        <Route exact path="/*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}
