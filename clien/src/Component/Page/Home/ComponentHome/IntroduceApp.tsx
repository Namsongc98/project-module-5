import React from 'react'

import imgAppStore from "../../../../assets/img/imageAppStore.webp"
import imgGoogle from "../../../../assets/img/imageGooglePlay.webp"

const IntroduceApp:React.FC = () => {
    return (
        <section className="px-[128px] pt-[72px] pb-[88px] wp-contact relative">
            <div className="text-4xl mb-6 font-bold text-center">
                <span className='text-green-500'>Học</span>
                <span className=''> mà chơi,</span>
                <span className='text-green-500'> Chơi</span>
                <span className=''> mà học</span>
            </div>
            <p className=" text-center leading-6 font-semibold mx-[128px] mb-[56px] text-gray-500">Học mọi lúc mọi nơi với ứng dụng dành cho iOS và Android của chúng tôi. Bạn sẽ có trải nghiệm tốt nhất.</p>
            <div className="flex justify-center items-center gap-4 ">
                <div className="font-medium w-[185px] h-[55px] text-2xl btn-web hover:scale-[110%] duration-75 bg-white ">Học trên web</div>
                <img src={imgGoogle} alt="" className="w-[185px] h-[55px] hover:scale-[110%] duration-75" />
                <img src={imgAppStore} alt="" className="w-[185px] h-[55px] hover:scale-[110%] duration-75" />
            </div>
            <div className="lg:block absolute w-56 h-56 bg-blue-600 opacity-100  top-[160px]  left-[300px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
            <div className=" bg-blue-600 opacity-100 lg:block absolute w-56 h-56 -top-[40px] left-[600px] bg-colorLandingAqua blur-[130px] rounded-full -z-10"></div>
        </section>
    )
}

export default IntroduceApp