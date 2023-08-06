import React from 'react'
import imgbig from "../../../assets/img/logo-dino-full-03.png"

import { Link } from 'react-router-dom'
const NotFound: React.FC = () => {
    return (
        <div>
            <div className='my-[100px] mx-auto w-[50%]'>
                <div className=" m-5 ">
                    <p className="text-center mt-5 text-9xl font-bold opacity-50">404</p>
                    <p className="text-center mt-5 text-2xl font-bold opacity-50">The page you're looking for doesn't exist.</p>
                </div>
                <div className="">
                    <img src={imgbig} alt="" className='w-40  mx-auto' />
                </div>
                <div className=" mx-auto  my-10">
                    <Link to="/" className='  mx-auto hover:opacity-80 block w-[250px] h-12 rounded-lg bg-blue-600 text-white font-medium text-xl text-center leading-[48px]  '>Back to Home Page </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound