import React, { useState, useRef, useEffect } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import imgLogo from "../../../../../assets/img/imageLogo.webp"
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getLogin, logout } from '../../../../../Reducer/Slice/UserSlice'
import { Link, useNavigate } from 'react-router-dom'
import { CurrenUser, IProfile } from '../../../../../type/UserModule'
import "../Header.scss"
import { getProfile } from '../../../../../Reducer/Slice/Profile'
import { FaRegRegistered } from 'react-icons/fa'


const DropUser: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const refWapper: any = useRef();
    const [dropProfile, setDropProfile] = useState(false);
    const profile: IProfile = useSelector(getProfile)
    const user: CurrenUser = useSelector(getLogin)
    useEffect(() => {
        let handleClose = (e: any) => {
            if (!refWapper.current.contains(e.target)) {
                setDropProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClose);
        return () => {
            document.removeEventListener("mousedown", handleClose);
        };
    }, []);

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className="relative popupProfile">
            <div className="flex items-center gap-1 font-medium text-base cursor-pointer" ref={refWapper} onClick={() => setDropProfile(!dropProfile)}>
                <div className="w-9 h-9 rounded-full overflow-hidden " >
                    {profile?.avatar ? <img src={profile?.avatar} alt="" className='h-9 object-cover w-9' /> :
                        <img src={imgLogo} alt="" />
                    }
                </div>

                <p className=" text-green-500 ">{profile?.firstName}  {profile?.lastName}  </p>
                <RiArrowDropDownLine className="text-green-500 text-2xl" />
            </div>

            <div className={`flex absolute w-40 top-12  flex-col  rounded-md bg-green-500 gap-2 text-white cursor-pointer  
                 ${dropProfile ? `activeProfile` : `inactiveProfile`
                }`}>
                {user?.role === "admin" ?
                    <Link to="/manageruser" className=" flex justify-start gap-3 px-5 items-center hover:bg-green-400 p-1">
                        <div className=" ">
                            <MdOutlineAdminPanelSettings style={{ fontSize: "25px" }} />
                        </div>
                        <p className=""> Admin</p>
                    </Link> :
                    <Link to="/register" className=" flex justify-start gap-3 px-5 items-center hover:bg-green-400 p-1">
                        <div className=" ">
                            <FaRegRegistered style={{ fontSize: "25px" }} />
                        </div>
                        <p className="" onClick={handleLogout}> Đăng kí</p>
                    </Link>

                }
                <div className=" flex justify-start gap-3 px-5 items-center text-white  hover:bg-green-400 p-1 " onClick={handleLogout}>
                    <div className="">
                        <AiOutlineLogout style={{ fontSize: "25px" }} />
                    </div>
                    <p className=" "> Đăng xuất</p>
                </div>
            </div>
        </div>
    )
}

export default DropUser