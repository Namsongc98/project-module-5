import React, { useState } from 'react'
import "../Learn.scss"
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../Store/Store'
import { getTopicAdvanced, getTopicBeginner, getTopicIntermediate } from '../../../../../Reducer/Slice/UseTopic'
import logo from "../../../../../assets/img/imageLogo.webp"
import { AiOutlineMenu } from 'react-icons/ai'

const LeftLearn: React.FC = () => {
    const beginner = useAppSelector(getTopicBeginner)
    const intermediate = useAppSelector(getTopicIntermediate)
    const advanced = useAppSelector(getTopicAdvanced)
    const [active, setActive] = useState(true)
    const [isTopic, setTopic] = useState(false)
    const navigater = useNavigate()

    const handleRouter = (name: string) => {
        navigater(`/topic/${name}/learn`)
    }

    return (
        <div className={` wp-learn-left ${active ? "isOpen " : "isClose"}`}>
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
            {beginner?.map((item: any) => (
                <div onClick={() => handleRouter(item.name)} className={`item-topic `} key={item.id} >
                    <p className="item-topic-name">{item.name}</p>
                    <div className="wp-img-topic">
                        <img src={item.image} alt="" className="img-topic" />
                    </div>
                </div>
            ))}
            {intermediate?.map((item: any) => (
                <div onClick={() => handleRouter(item.name)} className={`item-topic `} key={item.id} >
                    <p className="item-topic-name">{item.name}</p>
                    <div className="wp-img-topic">
                        <img src={item.image} alt="" className="img-topic" />
                    </div>
                </div>
            ))}
            {advanced?.map((item: any) => (
                <div onClick={() => handleRouter(item.name)} className={`item-topic `} key={item.id} >
                    <p className="item-topic-name">{item.name}</p>
                    <div className="wp-img-topic">
                        <img src={item.image} alt="" className="img-topic" />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default LeftLearn