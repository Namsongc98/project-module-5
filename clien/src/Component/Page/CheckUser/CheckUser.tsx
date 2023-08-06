import React from 'react'
import { Link } from 'react-router-dom'
import imgbig from "../../../assets/img/imgBig.webp"
import imgtitle from "../../../assets/img/imageLogoText.webp"
import "./checkUser.scss"

const CheckUser: React.FC = () => {
    return (
        <div className='my-[100px] mx-auto w-[50%]'>

            <div className="">
                <img src={imgbig} alt="" className='w-40  mx-auto' />
            </div>
            <div className=" mt-5">

                <img src={imgtitle} alt="" className='w-64 mx-auto' />
                <p className="text-center mt-5 text-3xl font-bold opacity-50">Ứng dụng học Tiếng Anh miễn phí tốt nhất.</p>

            </div>
            <div className=" flex gap-5 mx-auto w-[50%] my-10">
                <Link to="/register" className='register-btn  '>Đăng kí </Link>
                <Link to="/login" className='register-btn '> Đăng nhập</Link>
            </div>
        </div>
    )
}

export default CheckUser