import React from 'react'

import imgLogo from "../../../../assets/img/7-meo-hoc-tieng-anh-huu-ich-cho-nguoi-moi-bat-dau.webp"
import imgInhome from "../../../../assets/img/9-cach-giup-ban-hoc-tieng-anh-giao-tiep-tai-nha.webp"
import imgVerb from "../../../../assets/img/chia-dong-tu-tieng-anh-cac-quy-tac-co-ban-can-biet.webp"
const IntroBlog: React.FC = () => {
    return (
        <section className=" mx-32 my-20 relative">
            <div className="mb-7">
                <h1 className="text-gray-600 font-bold text-4xl text-center">
                    Blog
                </h1>
            </div>
            <div className="">
                <div className="grid grid-cols-3 gap-6">
                    <article className="w-[280px] rounded-xl bg-white hover:shadow-xl duration-75 shadow border-solid border-inherit overflow-hidden">
                        <div className="">
                            <img src={imgLogo} alt="" className='' />
                        </div>
                        <div className="flex flex-col p-4 gap-5">
                            <div className="">
                                <h1 className=" font-medium text-xl">Khám phá lộ trình học tiềng Anh cho người mất gốc</h1>
                            </div>
                            <div className="">
                                <p className="opacity-100 text-slate-500 leading-7 font-medium text-base ">Đừng để tiếng Anh trở thành rào cản của bạn! Cùng tìm hiểu lộ trình học tiếng Anh hiệu quả cho người mất gốc nhé. </p>
                            </div>
                            <div className="self-end flex items-center gap-2 text-blue-500">
                                <p className="">Xem thêm</p>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className="mt-px" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                            </div>
                        </div>
                    </article>
                    <article className="w-[280px] rounded-xl bg-white hover:shadow-xl duration-75 shadow border-solid border-inherit overflow-hidden">
                        <div className="">
                            <img src={imgInhome} alt="" className='' />
                        </div>
                        <div className="flex flex-col p-4 gap-5">
                            <div className="">
                                <h1 className=" font-medium text-xl">9 cách giúp bạn học tiếng Anh giao tiếp tại nhà</h1>
                            </div>
                            <div className="">
                                <p className="opacity-100 text-slate-500 leading-7 font-medium text-base ">Hiểu tới 95% những cuộc hội thoại thông thường với 3000 từ vựng Tiếng Anh thông dụng nhất theo chủ đề. </p>
                            </div>
                            <div className="self-end flex items-center gap-2 text-blue-500">
                                <p className="">Xem thêm</p>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className="mt-px" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                            </div>
                        </div>
                    </article>
                    <article className="w-[280px] rounded-xl bg-white hover:shadow-xl duration-75 shadow border-solid border-inherit overflow-hidden">
                        <div className="">
                            <img src={imgVerb} alt="" className='' />
                        </div>
                        <div className="flex flex-col p-4 gap-5">
                            <div className="">
                                <h1 className=" font-medium text-xl">Chia động từ Tiếng Anh: Các quy tắc cơ bản cần biết</h1>
                            </div>
                            <div className="">
                                <p className="opacity-100 text-slate-500 leading-7 font-medium text-base ">Đừng để tiếng Anh trở thành rào cản của bạn! Cùng tìm hiểu lộ trình học tiếng Anh hiệu quả cho người mất gốc nhé.  </p>
                            </div>
                            <div className="self-end flex items-center gap-2 text-blue-500">
                                <p className="">Xem thêm</p>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className="mt-px" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className="hidden lg:block absolute w-56 h-56 top-[300px] lg:right-[100px] xl:right-[210px] 2xl:right-[320px] bg-colorLandingAqua blur-[130px] rounded-full -z-10"></div>
            <div className="hidden lg:block absolute w-56 h-56 top-[390px] lg:right-[200px] xl:right-[310px] 2xl:right-[425px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
        </section>
    )
}

export default IntroBlog