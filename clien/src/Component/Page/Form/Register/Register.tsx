import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import imgBig from "../../../../assets/img/imgBig.webp";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {axiosPublic} from "../../../../config/ConfigApi";
import { RegisterUser } from "../../../../type/UserModule";
import 'react-toastify/dist/ReactToastify.css';


const REGEX_EMAIL = /^([a-zA-Z0-9])+\@(([a-zA-Z])+\.)+([a-zA-Z]{3,4})+$/;
const REGEX_PASSWORD = /^([a-zA-Z0-9)]{6,20})$/;

const Register: React.FC = () => {

  // Email
  const [email, setEmail] = useState<string>("");
  const valiEmail = REGEX_EMAIL.test(email);
  //Password
  const [password, setPassword] = useState<string>("");
  const valiPassword = REGEX_PASSWORD.test(password);
  // Confirm_pwd
  const [confirm_pwd, setConfirm_pwd] = useState<string>("");
  const navigate = useNavigate()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password || !confirm_pwd) return showToastErrEmpty()
    if (!valiEmail) return showToastErrEmail()
    if (!valiPassword) return showToastValiPassword()
    if (password !== confirm_pwd) return showToastErrConfirm_pwd()
    const newUser: RegisterUser = {
      email: email,
      password: password,
    }
    try {
      const response = await axiosPublic.post("/users/register", newUser)
      const successData: string = response.data.message
      showToastSuccessData(successData)
      navigate("/login")
      return response.data
    } catch (error: any) {
      const errData: string = error.response.data.message
      return showToasterrData(errData)
    }
  };
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
  const showToastErrConfirm_pwd = () => {
    toast.warning('Vui lòng nhập đúng mật khẩu', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const showToastValiPassword = () => {
    toast.warning('Mật khẩu chứa 6 - 20 kí tự không chứa kí tự đặc biệt', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const showToasterrData = (errData: string) => {
    toast.warning(errData, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const showToastSuccessData = (successData: string) => {
    toast.success(successData, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  return (
    <div className="container-login">
      <ToastContainer className="text-xs font-medium" />
      <div className="login-wp">
        <div className="login-left">
          <img src={imgBig} alt="" className="" />
        </div>
        <form action="" className="login-right" onSubmit={handleRegister}>
          <div className="login-right-wp-title">
            <h1 className=" ">Đăng kí</h1>
          </div>
          <div className="lg-right-wpEmail">
            <label htmlFor="email" className="">
              Email:
            </label>
            <div className="lg-right-email-wpInput">
              <div className="  wp-icon-input">
                <MdAlternateEmail style={{ fontSize: "1.2em" }} />
              </div>
              <input
                id="email"
                type="text"
                placeholder="Nhập Email..."
                name="email"
                value={email}
                className=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="lg-right-wpEmail ">
            <label htmlFor="password">Password:</label>
            <div className="lg-right-email-wpInput">
              <div className=" wp-icon-input">
                <RiLockPasswordLine style={{ fontSize: "1.2em" }} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập Password..."
                value={password}
                className=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>
          <div className="lg-right-wpEmail ">
            <label htmlFor="confirm_pwd">Password:</label>
            <div className="lg-right-email-wpInput">
              <div className=" wp-icon-input">
                <RiLockPasswordLine style={{ fontSize: "1.2em" }} />
              </div>
              <input
                type="password"
                id="confirm_pwd"
                placeholder="Nhập lại mật khẩu..."
                className=""
                value={confirm_pwd}
                onChange={(e) => setConfirm_pwd(e.target.value)}
              />
            </div>

          </div>
          <button className="lg-right-btn "> Đăng kí</button>
          <div className="lg-ringt-wpAccout">
            <span className="">Bạn đã có tài khoản?</span>
            <Link to="/login" className="link-register">
              Đăng nhập
            </Link>
          </div>
        </form>
        <div className="poin-fade"></div>
      </div>
    </div>
  );
};

export default Register;
