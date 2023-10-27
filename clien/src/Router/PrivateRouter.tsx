import React from 'react'
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router';
import { CurrenUser } from '../type/UserModule';
import NotFound from '../Component/Page/NotFond/NotFound';
import { getLogin } from '../Reducer/Slice/UserSlice';



const PrivateRouter: React.FC = () => {
  const isAmin: CurrenUser = useSelector(getLogin)
  return (
    isAmin.role === "admin" ? <Outlet /> : <NotFound />
  )
}

export { PrivateRouter }