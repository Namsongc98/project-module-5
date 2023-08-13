import React, { useState } from 'react'
import "../Learn.scss"
import { useNavigate, } from 'react-router-dom'
import logo from "../../../../../assets/img/imageLogo.webp"
import { AiOutlineMenu } from 'react-icons/ai'
import { TopicData } from '../../../../../type/Topic'
import beginnerImg from "../../../../../assets/img/ic_beginner.webp"
import interImg from "../../../../../assets/img/ic_intermediate.webp"
import advanImg from "../../../../../assets/img/ic_advanced.webp"
import { useAppSelector } from '../../../../../Store/Store'
import { getProfile } from '../../../../../Reducer/Slice/Profile'
type propData = {
    dataStatusTopic: TopicData[],
    setpopup: React.Dispatch<React.SetStateAction<boolean>>,
    setImgTopic: React.Dispatch<React.SetStateAction<string>>,
    setNameTopic: React.Dispatch<React.SetStateAction<string>>,
    totalcoin: number
}
const LeftLearn: React.FC<propData> = ({ dataStatusTopic, setpopup, setImgTopic, setNameTopic, totalcoin }) => {
    const currenUser = useAppSelector(getProfile)
    const [active, setActive] = useState(true)
    const navigater = useNavigate()
    const handleRouter = (name: string, imgTopic: string, nameTopic: string, status: boolean | number) => {
        if (!status) {
            setpopup(true)
            setImgTopic(imgTopic)
            setNameTopic(nameTopic)
            return
        }
        navigater(`/topic/${name}/learn`)
    }

    const beginner = dataStatusTopic?.filter((topic: TopicData) => topic.lever === "Sơ cấp")
    const intermediate = dataStatusTopic?.filter((topic: TopicData) => topic.lever === "Trung cấp")
    const advanced = dataStatusTopic?.filter((topic: TopicData) => topic.lever === "Cao cấp")
    return (
        <div className={` wp-learn-left h-full  ${active ? "isOpen " : "isClose"}`}>
            <div className="wp-learn-left-head">
                <div className="wp-head infor">
                    <div className="wp-img-avatar">
                        <img src={logo} alt="" />
                    </div>
                    <p className="name-avatar">{currenUser.firstName} {currenUser.lastName}</p>
                </div>
                <div className="wp-head poin">
                    <div className="wp-exp">
                        <p className="">exp</p>
                    </div>
                    <p className="poin-profile">{totalcoin}</p>
                </div>
                <div className="navbar-active" onClick={() => setActive(!active)}>
                    <AiOutlineMenu className="menu-icon" />
                </div>
            </div>
            <div className="wp-datalearn">
                <div className="item-topic wp-lever">
                    <p className="item-topic-name lever-name">Sơ Cấp</p>
                    <div className="wp-img-topic bg-white flex justify-center items-center ">
                        <img src={beginnerImg} alt="" className={` img-lever`} />
                    </div>
                </div>
                {beginner?.map((item: TopicData) => (
                    <div onClick={() => handleRouter(item.name, item.image, item.name, item.status_beginner)} className={`item-topic `} key={item.id} >
                        <p className="item-topic-name">{item.name}</p>
                        <div className="wp-img-topic">
                            <img src={item.image} alt="" className={`img-topic ${item.status_beginner ? "" : "isTopic"}`} />
                        </div>
                    </div>
                ))}
                <div className={`item-topic wp-lever `}>
                    <p className="item-topic-name lever-name">Trung Cấp</p>
                    <div className="wp-img-topic bg-white flex justify-center items-center ">
                        <img src={interImg} alt="" className=' img-lever ' />
                    </div>
                </div>
                {intermediate?.map((item: TopicData) => (
                    <div onClick={() => handleRouter(item.name, item.image, item.name, item.status_intermediate)} className={`item-topic `} key={item.id} >
                        <p className="item-topic-name">{item.name}</p>
                        <div className="wp-img-topic">
                            <img src={item.image} alt="" className={`img-topic ${item.status_intermediate ? "" : "isTopic"}`} />
                        </div>
                    </div>
                ))}
                <div className={`item-topic wp-lever `}>
                    <p className="item-topic-name lever-name">Cao Cấp</p>
                    <div className="wp-img-topic bg-white flex justify-center items-center ">
                        <img src={advanImg} alt="" className={` img-lever`} />
                    </div>
                </div>
                {advanced?.map((item: TopicData) => (
                    <div onClick={() => handleRouter(item.name, item.image, item.name, item.status_intermediate)} className={`item-topic `} key={item.id} >
                        <p className="item-topic-name">{item.name}</p>
                        <div className="wp-img-topic">
                            <img src={item.image} alt="" className={`img-topic ${item.status_advanced ? "" : "isTopic"}`} />
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}

export default LeftLearn