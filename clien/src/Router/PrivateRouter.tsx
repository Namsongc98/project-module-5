import React from 'react'
import { useSelector } from 'react-redux';

import { Outlet,useNavigate } from 'react-router';
import { CurrenUser } from '../type/UserModule';
import NotFound from '../Component/Page/NotFond/NotFound';
import { getLogin } from '../Reducer/Slice/UserSlice';



const PrivateRouter: React.FC = () => {
  const isAmin: CurrenUser = useSelector(getLogin)
  return (
    isAmin.role ? <Outlet /> : <NotFound/>
  )
}

export { PrivateRouter }