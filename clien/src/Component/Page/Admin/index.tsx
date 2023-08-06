import React from 'react'
import HeaderAmin from './DefaultLayoutAmin/Header/HeaderAmin'
import NabarAdmin from './DefaultLayoutAmin/Nabar/NabarAdmin'
import "./style.scss"
import { AiFillHeart } from 'react-icons/ai'

const Admin: React.FC<any> = ({ children }) => {
    return (<div className='flex relative  max-w-[1440px] '>
        <NabarAdmin />
        <div className=' bg-slate-100 w-[83.33%] right-0 fixed overflow-y-scroll h-screen'>
            <HeaderAmin />
            <div className="p-5 " >
                {children}
            </div>
            <div className="px-5 h-20 bg-white flex justify-between items-center" >
                <p className='opacity-70'>Copyright 2023 © Koho theme by pixelstrap</p>
                <AiFillHeart className='text-red-600 text-2xl'/>
            </div>
        </div>
    </div>
    )
}

export default Admin