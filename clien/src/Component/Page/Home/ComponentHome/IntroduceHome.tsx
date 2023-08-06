import React from 'react'
import imgBig from "../../../../assets/img/imgBig.webp"
export const IntroduceHome: React.FC = () => {

  return (
    <section className="mt-14 mb-[88px] mx-32 flex wp-title items-center">
      <div className=" wp-title-left">
        <h1 className="mb-8">
          <div className="font-bold text-[50px] leading-[70px] ">Học Tiếng Anh trực tuyến miễn phí</div>
          <div className="font-bold text-[47px] leading-[70px] text-green-500 ">cùng DinoEnglish</div>
        </h1>
        <div className=" flex flex-col gap-6 mb-12 w-[448px]">
          <div className="wp-list-title flex items-start">
            <div className="item-poin mr-4 mt-[6px] "></div>
            <p className="item-text text-gray-500 font-medium w-[448px] text-base">Học Tiếng Anh căn bản cho người mới bắt đầu hoặc nâng cao trình độ cho người mất gốc.</p>
          </div>
          <div className="wp-list-title flex items-start">
            <div className="item-poin mr-4 mt-[6px] "></div>
            <p className="item-text text-gray-500 font-medium w-[448px] text-base">Học Tiếng Anh cho các em học sinh, sinh viên, người đi làm.</p>
          </div>
          <div className="wp-list-title flex items-start">
            <div className="item-poin mr-4 mt-[6px] "></div>
            <p className="item-text text-gray-500 font-medium w-[448px] text-base">Học Tiếng Anh giao tiếp, Tiếng Anh học thuật, học Tiếng Anh online mỗi ngày.</p>
          </div>
          <div className="wp-list-title flex items-start">
            <div className="item-poin mr-4 mt-[6px] "></div>
            <p className="item-text text-gray-500 font-medium  text-base w-[448px]">Dễ dàng sử dụng, vừa học vừa chơi, đồng bộ trên mọi thiết bị, ...</p>
          </div>
        </div>
        <button className="landing-hover-btn h-14 ml-6 px-10 w-[188px] outline-none text-white bg-green-300 font-semibold text-base">Bắt đầu ngay</button>

      </div>
      <div className="wp-title-right">
        <img src={imgBig} alt="" className="w-[375px]" />
      </div>
      <div className=" lg:block absolute w-56 h-56 top-44 right-24 bg-colorLandingAqua blur-[130px] rounded-full -z-10"></div>
      <div className=" lg:block absolute w-56 h-56 top-12 right-0 bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
    </section>
  )
}
