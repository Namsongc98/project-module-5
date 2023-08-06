import React from 'react'
import imgLogo from "../../../../../assets/img/imageLogo.webp";
import imageLogoText from "../../../../../assets/img/imageLogoText.webp";
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CurrenUser, IProfile } from '../../../../../type/UserModule';
import { useAppSelector } from '../../../../../Store/Store';
import { getLogin } from '../../../../../Reducer/Slice/UserSlice';
import { getProfile } from '../../../../../Reducer/Slice/Profile';
const HeaderAmin: React.FC = () => {
  const currenUser: CurrenUser = useAppSelector(getLogin)
  const profile: IProfile = useAppSelector(getProfile)
 
  return (
    <header className="shadow sticky z-10  top-0 bg-white  max-w-[1650px] mx-auto flex justify-between items-center  py-3 px-10">
      <Link to="/" className="flex items-center h-full ">
        <div className="w-10 h-12 mr-3 relative" >
          <img src={imgLogo} alt="" className='' />
        </div>
        <div className="w-32 h-full flex ">
          <img src={imageLogoText} alt="" className='self-center' />
        </div>
      </Link>
      <div className="flex ">
        <div className="w-10 h-10 mr-3 rounded-full overflow-hidden object-cover" >
          <img src={profile?.avatar} alt="" className='' />
        </div>
        <div className=" ">
          <p className='text-sm opacity-70'>{currenUser.role}</p>
          <p className='text-sm font-bold opacity-60'>{profile?.firstName} {profile?.lastName} </p>
        </div>
      </div>

    </header>

  )
}

export default HeaderAmin