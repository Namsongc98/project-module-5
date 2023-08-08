import React, { useState } from 'react'
import leverOne from "../../../../assets/img/ic_beginner.webp"
import leverTwo from "../../../../assets/img/ic_intermediate.webp"
import leverThree from "../../../../assets/img/ic_advanced.webp"
import { useSelector } from 'react-redux'
import { getTopicAdvanced, getTopicBeginner, getTopicIntermediate } from '../../../../Reducer/Slice/UseTopic'
import { DataBeginner } from '../../../../type/Topic'
import { useNavigate } from 'react-router-dom'

const LeftTopic: React.FC = () => {
    const [IdPopup, setIdTopic] = useState(false)
    const intermediate: DataBeginner = useSelector(getTopicIntermediate)
    const beginner: DataBeginner = useSelector(getTopicBeginner)
    const advanced: DataBeginner = useSelector(getTopicAdvanced)
    const [imgTopic, setImgTopic] = useState("")
    const [nameTopic, setNameTopic] = useState("")
    const navigate = useNavigate()


    const handlTopic = (imgTopic: string, nameTopic: string, status: boolean) => {
        if (!status) {
            setIdTopic(true)
            setImgTopic(imgTopic)
            setNameTopic(nameTopic)
            return
        }
        return navigate(`${nameTopic}/learn`)
    }


    return (
        <div className='w-[55%] '>
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
                        <div onClick={() => handlTopic(topic.image, topic.name, topic.status)} key={topic.id} className={` flex items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]`}>
                            <div className="">
                                <p className="font-semibold text-xl">{topic.name}</p>
                                <p className="font-semibold opacity-60 mt-2">{topic.target}</p>
                            </div>
                            <div className={`rounded-full  overflow-hidden ${topic.status ? "" : "isTopic"}`}>
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
                <div className="w-full flex flex-col gap-5">
                    {intermediate?.map((topic) => (
                        <div key={topic.id} onClick={() => handlTopic(topic.image, topic.name, topic.status)} className="flex items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
                            <div className="">
                                <p className="font-semibold text-xl">{topic.name}</p>
                                <p className="font-semibold opacity-60 mt-2">{topic.target}</p>
                            </div>
                            <div className={`rounded-full  overflow-hidden ${topic.status ? "" : "isTopic"}`}>
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
                        <div key={topic.id} onClick={() => handlTopic(topic.image, topic.name, topic.status)} className="flex items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
                            <div className="">
                                <p className="font-semibold text-xl">{topic.name}</p>
                                <p className="font-semibold opacity-60 mt-2">{topic.target}</p>
                            </div>
                            <div className={`rounded-full  overflow-hidden ${topic.status ? "" : "isTopic"}`}>
                                <img src={topic.image} alt="" className='w-16 h-16' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {IdPopup && <div className='PopupTopic'>
                <div className="contenTopic">
                    <div className="wp-imgTopic">
                        <img src={imgTopic} alt="" className='imgTopic' />
                    </div>
                    <p className="m-3 text-xl font-semibold">{nameTopic}</p>
                    <p className="text-center font-medium opacity-60">Vượt qua bài kiểm tra Sơ cấp hoặc nâng cấp phiên bản Pro để mở khóa chủ đề này</p>
                    <button className="btn-Topic" onClick={() => setIdTopic(false)}>Hủy</button>
                </div>
            </div>}
        </div>
    )
}

export default LeftTopic