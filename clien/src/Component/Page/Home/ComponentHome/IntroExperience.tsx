import React from 'react'

import imgMinhHoa from "../../../../assets/img/minh-hoa-2.webp"
import imgBook from "../../../../assets/img/iconBook.svg"
import imgGame from "../../../../assets/img/iconGame.svg"
import imgSkill from "../../../../assets/img/iconSkill.svg"
import imgLever from "../../../../assets/img/iconLever.svg"

const IntroExperience:React.FC = () => {
  return (
    <section className="flex  items-center pt-16 pb-28 px-32 max-w-[1600px] relative width-[100%]">
    <div className="shrink-0 self-center mr-32 mt-8  relative w-80 h-80 ">
      <img src={imgMinhHoa} alt="" className="  " />
    </div>
    <div className=" self-center mb-12 relative ">
      <div className="mb-6">
        <h1 className="text-green-500 font-bold text-4xl"> Những trải nghiệm</h1>
        <h1 className="text-gray-600 font-bold text-3xl">từ DinoEnglish</h1>
        <p className=" opacity-100  text-slate-500 leading-7 font-medium text-lg">Dino English: Ứng dụng Học tiếng Anh miễn phí cho tất cả mọi người</p>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="px-6 py-3 flex rounded-[6px] justify-center gap-5 shadow-[0px_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.18)] duration-75 bg-white">
          <div className="w-16 h-16 shrink-0 flex self-center ">
            <img src={imgBook} alt="" className="w-[60px] h-[60px]" />
          </div>
          <div className="justify-items-start">
            <h3 className="text-gray-600 justify-items-start font-bold text-lg">Bài học đầy đủ, chi tiết</h3>
            <p className="opacity-100 text-slate-500 leading-7 font-medium text-base">Mỗi chủ đề (bài học) được thiết kế khoa học, hấp dẫn, lôi cuốn.</p>
          </div>
        </div>
        <div className="px-6 py-3 flex rounded-[6px] justify-center gap-5 shadow-[0px_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.18)] duration-75 bg-white">
          <div className="w-16 h-16 shrink-0 flex self-center ">
            <img src={imgGame} alt="" className="w-[60px] h-[60px]" />
          </div>
          <div className="">
            <h3 className="text-gray-600 font-bold text-lg">Trò chơi Tiếng anh thú vị</h3>
            <p className="opacity-100 text-slate-500 leading-7 font-medium text-base">Game từ vựng tiếng Anh thú vị giúp việc học tiếng Anh trở nên dễ dàng hấp dẫn hơn.</p>
          </div>
        </div>
        <div className="px-6 py-3 flex rounded-[6px] justify-center gap-5 shadow-[0px_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.18)] duration-75 bg-white">
          <div className="w-16 h-16 shrink-0 flex self-center ">
            <img src={imgSkill} alt="" className="w-[60px] h-[60px]" />
          </div>
          <div className="">
            <h3 className="text-gray-600 font-bold text-lg">Rèn luyện 4 kĩ năng</h3>
            <p className="opacity-100 text-slate-500 leading-7 font-medium text-base">Phát triển toàn diện 4 kỹ năng: luyện nghe tiếng Anh, nói tiếng Anh, đọc tiếng Anh và viết tiếng Anh.</p>
          </div>
        </div>
        <div className="px-6 py-3 flex rounded-[6px] justify-center gap-5 shadow-[0px_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.18)] duration-75 bg-white">
          <div className="w-16 h-16 shrink-0 flex self-center ">
            <img src={imgLever} alt="" className="w-[60px] h-[60px]" />
          </div>
          <div className="">
            <h3 className="text-gray-600 font-bold text-lg">Bài học đầy đủ, chi tiết</h3>
            <p className="opacity-100 text-slate-500 leading-7 font-medium text-base">Nhiều dạng bài tập thú vị giúp ghi nhớ từ vựng, ngữ pháp hiệu quả hơn.</p>
          </div>
        </div>
      </div>
    </div>
    <div className=" absolute w-56 h-56 top-[230px] -left-[80px] bg-colorLandingEmerald blur-[130px] rounded-full -z-10"></div>
    <div className="  absolute w-56 h-56 top-[435px] left-[640px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
  </section>
  )
}

export default IntroExperience