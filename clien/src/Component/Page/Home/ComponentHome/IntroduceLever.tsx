import React from 'react'
import imgLeverOne from "../../../../assets/img/ic_beginner.webp"
import imgLeverTwo from "../../../../assets/img/ic_intermediate.webp"
import imgLeverThree from "../../../../assets/img/ic_advanced.webp"
const IntroduceLever:React.FC = () => {
  return (
    <section className=" px-[128px] mt-[72px] mb-[96px] relative">
    <div className="text-4xl mb-6 font-bold text-center">
      <span className='text-green-500'>Lộ Trình </span>
      <span className=''> học</span>
    </div>
    <p className=" text-center leading 6 font-semibold mx-[128px] mb-[56px] text-gray-500">Ứng dụng Học tiếng Anh online đáp ứng lộ trình học tập rõ ràng phù hợp với trình độ.</p>
    <div className="flex justify-center gap-6 px-4">
      <div className="bg-white w-full rounded-3xl text-center shadow-[0px_4px_10px_rgba(0,0,0,0.25)] pt-7 pb-6 px-7 lg:pt-10 lg:pb-8 lg:px-11 hover:-translate-y-1 duration-75">
        <div className="">
          <div className="">
            <img src={imgLeverOne} alt="" className="w-20 h-20 p-2 mx-auto mb-4 lg:mb-6 bg-white rounded-full shadow-[0px_1px_4px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
        <p className="text-xl font-bold mb-3">Sơ cấp</p>
        <div className=" opacity-100 text-slate-500 leading-7 font-medium text-lg">Học kiến thức tiếng Anh giao tiếp thông dụng, phù hợp cho người mới bắt đầu</div>
      </div>
      <div className="bg-white w-full rounded-3xl text-center shadow-[0px_4px_10px_rgba(0,0,0,0.25)] pt-7 pb-6 px-7 lg:pt-10 lg:pb-8 lg:px-11 hover:-translate-y-1 duration-75">
        <div className="">
          <div className="">
            <img src={imgLeverTwo} alt="" className="w-20 h-20 p-2 mx-auto mb-4 lg:mb-6 bg-white rounded-full shadow-[0px_1px_4px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
        <p className="text-xl font-bold mb-3">Trung cấp</p>
        <div className=" opacity-100 text-slate-500 leading-7 font-medium text-lg">Giúp người học nâng cao trình độ, vượt qua mức căn bản</div>
      </div>
      <div className="bg-white w-full rounded-3xl text-center shadow-[0px_4px_10px_rgba(0,0,0,0.25)] pt-7 pb-6 px-7 lg:pt-10 lg:pb-8 lg:px-11 hover:-translate-y-1 duration-75">
        <div className="">
          <div className="">
            <img src={imgLeverThree} alt="" className="w-20 h-20 p-2 mx-auto mb-4 lg:mb-6 bg-white rounded-full shadow-[0px_1px_4px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
        <p className="text-xl font-bold mb-3">Cao cấp</p>
        <div className=" opacity-100 text-slate-500 leading-7 font-medium text-lg">Giúp người học nâng cao trình độ, vượt qua mức căn bản</div>
      </div>
    </div>
    <div className="hidden lg:block absolute w-56 h-56 top-[200px] left-[648px] bg-colorLandingAqua blur-[130px] rounded-full -z-10"></div>
    <div className="hidden lg:block absolute w-56 h-56 top-[285px] left-[730px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
  </section>
  )
}

export default IntroduceLever