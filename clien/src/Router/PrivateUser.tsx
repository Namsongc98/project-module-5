import React from 'react'

import { getLogin } from '../Reducer/Slice/UserSlice'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NotFound from '../Component/Page/NotFond/NotFound'

const PrivateUserRouter: React.FC = () => {
    const isUser = useSelector(getLogin)
    return (
        isUser || isUser?.role === "admin" ? <Outlet /> : <NotFound />
    )
}

export default PrivateUserRouter