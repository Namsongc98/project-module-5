import React from 'react'
import leverOne from "../../../../assets/img/ic_beginner.webp"
import leverTwo from "../../../../assets/img/ic_intermediate.webp"
import leverThree from "../../../../assets/img/ic_advanced.webp"
import imgHello from "../../../../assets/img/imageHello.webp"
import { useSelector } from 'react-redux'
import { getTopicAdvanced, getTopicBeginner, getTopicIntermediate } from '../../../../Reducer/Slice/UseTopic'
import { DataBeginner } from '../../../../type/Topic'

const LeftTopic: React.FC = () => {
    const intermediate: DataBeginner = useSelector(getTopicIntermediate)
    const beginner: DataBeginner = useSelector(getTopicBeginner)
    const advanced: DataBeginner = useSelector(getTopicAdvanced)

    return (
        <div className='w-[55%]'>
            <div className="">
                <h1 className="font-bold text-3xl opacity-70">Chủ đề</h1>
            </div>
            <div className="">
                <div className="flex gap-2  items-center ">
                    <h1 className="font-semibold text-2xl text-slate-500">Sơ Cấp</h1>
                    <img src={leverOne} alt="" className='w-8 h-8' />
                </div>
                <div className="w-full flex flex-col gap-5 ">
                    {beginner?.map((topic) => (
                        <div key={topic.id} className="flex items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
                            <div className="">
                                <p className="font-semibold text-xl">{topic.name}</p>
                                <p className="font-semibold opacity-60 mt-2">{topic.target}</p>
                            </div>
                            <div className="">
                                <img src={topic.image} alt="" className='w-16 h-16' />
                            </div>

                        </div>

                    ))}
                </div>
            </div>
            <div className="">
                <div className="flex gap-2  items-center ">
                    <h1 className="font-semibold text-2xl text-slate-500">Trung cấp</h1>
                    <img src={leverTwo} alt="" className='w-8 h-8' />
                </div>
                <div className="w-full flex flex-col gap-5 ">
                    {intermediate?.map((topic) => (
                        <div key={topic.id} className="flex items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
                            <div className="">
                                <p className="font-semibold text-xl">{topic.name}</p>
                                <p className="font-semibold opacity-60 mt-2">{topic.target}</p>
                            </div>
                            <div className="">
                                <img src={topic.image} alt="" className='w-16 h-16' />
                            </div>

                        </div>

                    ))}

                </div>
            </div>
            <div className="">
                <div className="flex gap-2  items-center ">
                    <h1 className="font-semibold text-2xl text-slate-500">Cao cấp</h1>
                    <img src={leverThree} alt="" className='w-8 h-8' />
                </div>
                <div className="w-full flex flex-col gap-5 ">
                    {advanced?.map((topic) => (
                        <div key={topic.id} className="flex items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
                            <div className="">
                                <p className="font-semibold text-xl">{topic.name}</p>
                                <p className="font-semibold opacity-60 mt-2">{topic.target}</p>
                            </div>
                            <div className="">
                                <img src={topic.image} alt="" className='w-16 h-16' />
                            </div>

                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}

export default LeftTopic