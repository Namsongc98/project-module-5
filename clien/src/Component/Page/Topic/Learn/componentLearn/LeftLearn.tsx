import React, { useState } from 'react'
import "../Learn.scss"
import { useNavigate, } from 'react-router-dom'
import logo from "../../../../../assets/img/imageLogo.webp"
import { AiOutlineMenu } from 'react-icons/ai'
import { TopicData } from '../../../../../type/Topic'
type propData = {
    dataTopic: TopicData[],
    setpopup: React.Dispatch<React.SetStateAction<boolean>>;
    setImgTopic: React.Dispatch<React.SetStateAction<string>>
    setNameTopic: React.Dispatch<React.SetStateAction<string>>
}
const LeftLearn: React.FC<propData> = ({ dataTopic, setpopup, setImgTopic, setNameTopic }) => {
    const [active, setActive] = useState(true)
    const navigater = useNavigate()
    const handleRouter = (name: string, imgTopic: string, nameTopic: string, status: boolean) => {
        if (!status) {
            setpopup(true)
            setImgTopic(imgTopic)
            setNameTopic(nameTopic)
            return
        }
        navigater(`/topic/${name}/learn`)
    }
    const beginner = dataTopic?.filter((topic: TopicData) => topic.lever === "Sơ cấp")
    const intermediate = dataTopic?.filter((topic: TopicData) => topic.lever === "Trung cấp")
    const advanced = dataTopic?.filter((topic: TopicData) => topic.lever === "Cao cấp")

    return (
        <div className={` wp-learn-left h-full  ${active ? "isOpen " : "isClose"}`}>
            <div className="wp-learn-left-head">
                <div className="wp-head infor">
                    <div className="wp-img-avatar">
                        <img src={logo} alt="" />
                    </div>
                    <p className="name-avatar">Vũ Văn Sơn</p>
                </div>
                <div className="wp-head poin">
                    <div className="wp-exp">
                        <p className="">exp</p>
                    </div>
                    <p className="poin-profile">129</p>
                </div>
                <div className="navbar-active" onClick={() => setActive(!active)}>
                    <AiOutlineMenu className="menu-icon" />
                </div>
            </div>
            <div className="wp-datalearn">
                {beginner?.map((item: TopicData) => (
                    <div onClick={() => handleRouter(item.name, item.image, item.name, item.status_beginner)} className={`item-topic `} key={item.id} >
                        <p className="item-topic-name">{item.name}</p>
                        <div className="wp-img-topic">
                            <img src={item.image} alt="" className={`img-topic ${item.status_beginner ? "" : "isTopic"}`} />
                        </div>
                    </div>
                ))}
                {intermediate?.map((item: TopicData) => (
                    <div onClick={() => handleRouter(item.name, item.image, item.name, item.status_intermediate)} className={`item-topic `} key={item.id} >
                        <p className="item-topic-name">{item.name}</p>
                        <div className="wp-img-topic">
                            <img src={item.image} alt="" className={`img-topic ${item.status_intermediate ? "" : "isTopic"}`} />
                        </div>
                    </div>
                ))}
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