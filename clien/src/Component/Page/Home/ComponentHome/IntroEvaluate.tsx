import React, { useEffect, useState } from 'react'
import {axiosPublic} from '../../../../config/ConfigApi'
import { IEvaluateLimit } from '../../../../type/UserModule'
import { BsFillStarFill } from "react-icons/bs/index"

const IntroEvaluate: React.FC = () => {
    const [DataEvaluate, setDataEvaluate] = useState<IEvaluateLimit>([])
    const getEvalueteLimit = async () => {
        try {
            const response = await axiosPublic.get("evaluate/getevaluatelimit")
            setDataEvaluate(response.data)
            return response.data
        } catch (error) {
            throw new Error()
        }
    }
    useEffect(() => {
        getEvalueteLimit()
    }, [])
    return (
        <section className='px-32 py-20 mb-10 relative'>
            <div className=" text-center text-4xl mb-6 font-bold ">
                <span className='text-green-500'>Đánh giá </span>
                <span className=''>của người dùng</span>
            </div>
            <div className="flex justify-center flex-wrap gap-6">
                {DataEvaluate?.map((evaluete, index) => (
                    <div key={index} className="py-6 pl-8 pr-4 flex flex-col  gap-2 shadow hover:shadow-lg w-[325px] rounded-lg bg-white">
                        <div className="flex gap-2 items-center  mb-5">
                            <div className="w-9 h-9 rounded-[50%]  overflow-hidden">
                                <img src={evaluete?.avatar} alt="" className="w-9 h-9 object-cover " />
                            </div>
                            <span className="font-medium ml-2">{evaluete?.firstName} {evaluete?.lastName}</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-yellow-400 flex" >
                                {[...Array(evaluete?.rating)].map((_, index) => (
                                    <BsFillStarFill key={index} />
                                ))}
                            </div>
                            <span className='font-medium text-xs text-gray-400 '>{evaluete?.date}</span>
                        </div>
                        <div className="">
                            <p className="text-base font-semibold opacity-80">
                                {evaluete?.evaluate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden lg:block absolute w-56 h-56 top-[100px] xl:left-[450px] bg-colorLandingAqua blur-[130px] rounded-full -z-10"></div>
            <div className="hidden lg:block absolute w-56 h-56 top-[230px] right-[150px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
        </section>
    )
}

export default IntroEvaluate