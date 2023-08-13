import React from 'react'
import imgHello from "../../../../assets/img/imageHello.webp"
import imgDog from "../../../../assets/img/imageDog.webp"
import imgNumber from "../../../../assets/img/imageNumber.webp"
import imgDance from "../../../../assets/img/imageDance.webp"
import imglogo from "../../../../assets/img/imageLogo.webp"
import imgGG from "../../../../assets/img/imageGooglePlay.webp"
import imgLogo from "../../../../assets/img/7-meo-hoc-tieng-anh-huu-ich-cho-nguoi-moi-bat-dau.webp"
import imgInhome from "../../../../assets/img/9-cach-giup-ban-hoc-tieng-anh-giao-tiep-tai-nha.webp"
import imgVerb from "../../../../assets/img/chia-dong-tu-tieng-anh-cac-quy-tac-co-ban-can-biet.webp"
import { BsFillStarFill } from "react-icons/bs/index"
import { TopicData } from '../../../../type/Topic'

type dataProp = {
    dataTopic: TopicData[]
}
const RightTopic: React.FC<dataProp> = ({ dataTopic }) => {


    const lengthTopic = dataTopic.length

    const totalPoint = dataTopic.reduce((topic, currentopic) => {
        return topic + currentopic.poiter
    }, 0)

    const lengthcompete = dataTopic.filter((topic) => topic.poiter > 0)

    console.log(lengthcompete)
    return (
        <div className='w-[40%] flex flex-col gap-5'>
            <div className="p-4 border-solid border-slate-200 border-2 rounded-2xl ">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl">Gần đây </p>
                    <p className="text-sm font-semibold opacity-60">Xem Tất cả</p>
                </div>
                <div className="flex justify-between mt-3">
                    <img src={imgHello} alt="" className="w-[72px]" />
                    <img src={imgDog} alt="" className="w-[72px]" />
                    <img src={imgNumber} alt="" className="w-[72px]" />
                    <img src={imgDance} alt="" className="w-[72px]" />
                </div>
            </div>
            <div className="p-4 border-solid border-slate-200 border-2 rounded-2xl">
                <p className="font-semibold text-xl">Tiến độ học</p>
                <div className="font-semibold text-lg flex justify-between my-3">
                    <p className="opacity-50">Tổng kinh nghiệm</p>
                    <p className="text-yellow-300">{totalPoint} exp</p>
                </div>
                <div className="font-semibold text-lg flex justify-between my-3">
                    <p className="opacity-50">Chủ đề đã hoàn thành</p>
                    <p className="text-blue-500">{lengthcompete.length}/{lengthTopic}</p>
                </div>
                {/* <div className="font-semibold text-lg flex justify-between my-3">
                    <p className="opacity-50">Bài kiểm tra đã hoàn thành</p>
                    <p className="text-red-500">0/3</p>
                </div> */}
            </div>
            <div className="p-4 border-solid border-slate-200 border-2 rounded-2xl">
                <p className="font-semibold text-xl">Tải ứng dụng trên Android</p>
                <div className=" shadow-sm hover:shadow-md hover:scale-[101%] gap-1 p-3 border-solid border-slate-200 border-[1px] rounded-2xl m-2 flex justify-between items-center">
                    <div className="">
                        <img src={imglogo} alt="" className='w-12 h-12' />
                    </div>
                    <div className="">
                        <p className="">Dino Enghlish</p>
                        <div className="flex gap-2 mt-1">
                            <BsFillStarFill style={{ fontSize: "14px" }} className="text-yellow-300" />
                            <BsFillStarFill style={{ fontSize: "14px" }} className="text-yellow-300" />
                            <BsFillStarFill style={{ fontSize: "14px" }} className="text-yellow-300" />
                            <BsFillStarFill style={{ fontSize: "14px" }} className="text-yellow-300" />
                            <BsFillStarFill style={{ fontSize: "14px" }} className="text-yellow-300" />
                        </div>
                    </div>
                    <div className="">
                        <img src={imgGG} alt="" className='h-8' />
                    </div>
                </div>
            </div>
            <div className="p-4 border-solid border-slate-200 border-2 rounded-2xl ">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl">Tin tức </p>
                    <p className="text-sm font-semibold opacity-60">Xem Tất cả</p>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2 items-center ">

                        <img src={imgLogo} alt="" className='w-14 h-14 object-cover rounded ' />
                        <p className=" font-medium">Khám phá lộ trình học tiềng Anh cho người mất gốc</p>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <img src={imgInhome} alt="" className='w-14 h-14 object-cover rounded' />
                        <p className="font-medium">9 cách giúp bạn học tiếng Anh giao tiếp tại nhà</p>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <img src={imgVerb} alt="" className='w-14 h-14 object-cover rounded' />
                        <p className="font-medium">Chia động từ Tiếng Anh: Các quy tắc cơ bản cần biết</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RightTopic