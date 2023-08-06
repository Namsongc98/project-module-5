import React from 'react';
import imgLogo from "../../../../assets/img/imageLogo.webp";
import imageLogoText from "../../../../assets/img/imageLogoText.webp";
import { Link, NavLink } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai/index";
import { FaRegUser } from "react-icons/fa/index";
import { BiSolidBook } from "react-icons/bi/index";
import DropUser from './dropHeader/DropUser';
import { useSelector } from 'react-redux';
import "./Header.scss";
import { CurrenUser } from '../../../../type/UserModule';
import { getLogin } from '../../../../Reducer/Slice/UserSlice';

const Header: React.FC = () => {
  const currenUser: any = useSelector(getLogin)
  return (
    <div className="shadow sticky z-10 h-20  top-0 bg-white  max-w-[1650px] mx-auto flex justify-between items-center  py-3 md:py-2 px-6 md:px-16 lg:px-32">
      <div className="flex items-center h-full ">
        <div className="w-12 h-12 mr-3 relative" >
          <img src={imgLogo} alt="" className='' />
        </div>
        <div className="w-36 h-full flex ">
          <img src={imageLogoText} alt="" className='self-center' />
        </div>
      </div>
      <div className=" flex ">
        <NavLink to="/"
          style={({ isActive }) => ({ color: isActive ? "#4385f3" : "#bdbdbd" })}
          className={`mx-2 p-2 rounded-lg hover:bg-gray-100 duration-100 ease-out font-semibold text-base gap-1  flex items-center`}>
          <AiFillHome style={{ fontSize: "1.3em" }} className="" />
          <span className=" ">Trang chủ</span>
        </NavLink>
        <NavLink to={currenUser?.id ? `/profile` : `/checkuser`}
          style={({ isActive }) => ({ color: isActive ? "#4385f3" : "#bdbdbd" })}
          className="mx-2 p-2 rounded-lg hover:bg-gray-100 duration-100 ease-out font-semibold text-base gap-1 flex items-center ">
          <FaRegUser style={{ fontSize: "1.2em" }} className="" />
          <span className="">Hồ sơ</span>
        </NavLink>
        <NavLink to={currenUser?.id ? `/topic` : `/checkuser`}
          style={({ isActive }) => ({ color: isActive ? "#4385f3" : "#bdbdbd" })}
          className="mx-2 p-2 rounded-lg hover:bg-gray-100 duration-100 ease-out font-semibold text-base gap-1 flex items-center ">
          <BiSolidBook style={{ fontSize: "1.3em" }} className="" />
          <span className="">Học tập</span>
        </NavLink>
      </div>
      <div className=" flex">
        {currenUser?.id ?
          <DropUser /> :
          <>
            <Link to="/register" className="text-center">
              <div className="landing-hover-btn leading-[40px] h-10 ml-6  w-[130px]  text-white bg-green-300 font-semibold text-base">Đăng Kí </div>
            </Link>
            <Link to="/login" className="text-center">
              <div className="landing-hover-btn leading-[40px] h-10 ml-6  w-[130px]  text-white bg-green-300 font-semibold text-base">Đăng nhập</div>
            </Link>
          </>
        }
      </div>
    </div>
  )
}

export default Header