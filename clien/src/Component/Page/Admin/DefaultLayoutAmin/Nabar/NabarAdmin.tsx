import React from 'react'
import img from "../../../../../assets/img/imageLogo.webp"
import { Link, NavLink } from 'react-router-dom'
import { FaUsers } from "react-icons/fa/index"
import { useAppSelector } from '../../../../../Store/Store'
import { CurrenUser, IProfile } from '../../../../../type/UserModule'
import { AiFillHome, AiFillQuestionCircle, AiFillRead } from "react-icons/ai/index"
import "./nabarAdmin.scss"
import { getLogin } from '../../../../../Reducer/Slice/UserSlice'
import { getProfile } from '../../../../../Reducer/Slice/Profile'
const NabarAdmin: React.FC = () => {
  const currenUser: CurrenUser = useAppSelector(getLogin)
  const prrofile: IProfile = useAppSelector(getProfile)
  return (
    <div className=" bg-[#299cdb] w-[16.66%] py-10 top-0 left-0 h-[100vh] fixed">
      <div className="mx-auto">
        <div className=" w-[5em] h-[5em] rounded-[50%]   overflow-hidden mx-auto ">
          {prrofile?.avatar ?
            <img src={prrofile?.avatar} alt="" className='w-[5em] h-[5em] object-cover' /> :
            <img src={img} alt="" className='w-[5em] h-[5em] object-cover' />
          }
        </div>
        <div className="mt-5 text-center text-white">
          <p className="font-semibold text-lg">{prrofile?.firstName} {prrofile?.lastName}</p>
          <p className="">{currenUser.role && "Admin"}</p>
        </div>
      </div>
      <div className=" flex flex-col justify-center mt-10 gap-5 wp-nabar-admin">
        <NavLink to="/manageruser" className={`flex items-center gap-3  px-8 py-2 text-white hover:text-blue-800  `}>
          <FaUsers style={{ fontSize: "1.8em" }} />
          <span className='font-semibold text-base'> Người dùng</span>
        </NavLink>
        <NavLink to="/managertopic" className={`flex items-center gap-3  px-8 py-2 text-white hover:text-blue-800  `}>
          <AiFillRead style={{ fontSize: "1.8em" }} />
          <span className='font-semibold text-base'>Chủ đề</span>
        </NavLink>
        <NavLink to="/managerquestion" className={`flex items-center gap-3  px-8 py-2 text-white hover:text-blue-800  `}>
          <AiFillQuestionCircle style={{ fontSize: "1.8em" }} />
          <span className='font-semibold text-base'>Câu hỏi</span>
        </NavLink>
        <NavLink to="/" className={`flex items-center gap-3  px-8 py-2 text-white hover:text-blue-800  `}>
          <AiFillHome style={{ fontSize: "1.8em" }} />
          <span className='font-semibold text-base'>Trang Chủ</span>
        </NavLink>
      </div>
    </div>
  )
}

export default NabarAdmin