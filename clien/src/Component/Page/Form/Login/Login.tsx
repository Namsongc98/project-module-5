import React, { useEffect, useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { MdAlternateEmail } from "react-icons/md/index"
import { RiLockPasswordLine } from "react-icons/ri/index"
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from "@reduxjs/toolkit";
import imgBig from "../../../../assets/img/imgBig.webp"
import { NewUser } from '../../../../type/UserModule'
import { axiosPublic } from '../../../../config/ConfigApi'
import { setLogin } from '../../../../Reducer/Slice/UserSlice'
import "../forn.scss"
import { setProfile } from '../../../../Reducer/Slice/Profile'
const REGEX_EMAIL = /^([a-zA-Z0-9])+\@(([a-zA-Z])+\.)+([a-zA-Z]{3,4})+$/;
const REGEX_PASSWORD = /^([a-zA-Z0-9)]{6,20})$/;

const Login: React.FC = () => {

  // Email
  const [email, setEmail] = useState<string>("");
  const valiEmail = REGEX_EMAIL.test(email);
  //Password
  const [password, setPassword] = useState<string>("");
  const valiPassword = REGEX_PASSWORD.test(password);
  // err backend
  const [errLogin, setErrLogin] = useState<string>()
  // Confirm_pwd
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const [couter, setCouter] = useState<number>(0)


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return showToastErrEmpty()
    if (!valiEmail) return showToastErrEmail()
    if (!valiPassword) return showToastValiPassword()
    const newUser: NewUser = {
      email,
      password,
    }
    try {
      const response = await axiosPublic.post("/auth/login", newUser);
      const token = response.data.access_token
      document.cookie = `token=${token}`
      dispatch(setLogin(response.data))
      dispatch(setProfile(response.data))
      navigate("/")
      return response.data;
    } catch (error) {
      setErrLogin(error.response.data.message)
      setCouter(couter + 1)
      throw new Error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (typeof errLogin === "string")
      showToastErrData(errLogin)
  }, [couter])

  // showToastErrData
  const showToastErrData = (errLogin: string) => {
    toast.warning(`${errLogin}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const showToastErrEmpty = () => {
    toast.warning(' Vui lòng nhập đầy đủ thông tin!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const showToastErrEmail = () => {
    toast.warning('Vui lòng nhập đúng định dạng Email ví dụ: example@gmail.com!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const showToastValiPassword = () => {
    toast.warning('Mật khẩu chứa 6 - 20 kí tự không chứa kí tự đặc biệt', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <div className="container-login">
      <ToastContainer className="text-xs font-medium" />
      <div className='login-wp' >
        <div className="login-left">
          <img src={imgBig} alt="" className="" />
        </div>
        <form action="" className="login-right" onSubmit={(e) => handleLogin(e)} >
          <div className="login-right-wp-title">
            <h1 className=' '>Đăng nhập</h1>
          </div>
          <div className="lg-right-wpEmail">
            <label htmlFor="email" className=''>Email:</label>
            <div className="lg-right-email-wpInput">
              <div className="  wp-icon-input"><MdAlternateEmail style={{ fontSize: "1.2em" }} /></div>
              <input id='email' type="text" placeholder='Nhập Email' className='' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="lg-right-wpEmail ">
            <label htmlFor="password">Password:</label>
            <div className="lg-right-email-wpInput">
              <div className=" wp-icon-input"><RiLockPasswordLine style={{ fontSize: "1.2em" }} /></div>
              <input id='password' type="password" name='password' placeholder='Nhập Password' className='' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button className='lg-right-btn '> Đăng nhập</button>
          <div className="lg-ringt-wpAccout">
            <span className="font-semibold">Tạo tài khoản?</span>
            <Link to="/register" className="link-register"> Đăng kí</Link>
          </div>
        </form>
        <div className="poin-fade"></div>
      </div>
    </div>
  )
}
export default Login