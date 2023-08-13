import React, { useState, useEffect } from 'react'

import LeftLearn from './componentLearn/LeftLearn'
import RightLearn from './componentLearn/RightLearn'
import { axiosPrivate } from '../../../../config/ConfigApi'
import { TopicData } from '../../../../type/Topic'
import { useSelector } from 'react-redux'
import { getLogin } from '../../../../Reducer/Slice/UserSlice'
import { AiFillHome } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Learn: React.FC = () => {
    const currenUser = useSelector(getLogin)
    const useId = currenUser.id
    const [dataStatusTopic, setDataStatusTopic] = useState<TopicData[]>([])
    const [popup, setpopup] = useState(false)
    const [imgTopic, setImgTopic] = useState("")
    const [nameTopic, setNameTopic] = useState("")
    const [nextLever, setNextLever] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const getTopic = async () => {
        try {
            const response = await axiosPrivate.get(`/status/topic/${useId}`)
            setDataStatusTopic(response.data)
            return response.data
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(() => {
        getTopic()
    }, [])
    const totalcoin = dataStatusTopic.reduce((poin, topic) => poin + topic.poiter, 0)
    const statusTopic = dataStatusTopic.find((topic) => topic.name === id)
    const currenLever = dataStatusTopic.filter((topic) => topic.lever === "Trung cấp")
    const advanLever = dataStatusTopic.filter((topic) => topic.lever === "Cao cấp")

    const handleNext = () => {
        if (statusTopic?.lever === "Sơ cấp") {
            setNextLever(false)
            getTopic()
            navigate(`/topic/${currenLever[0].name}/learn`)
        }
        if (statusTopic?.lever === "Trung cấp") {
            setNextLever(false)
            getTopic()
            navigate(`/topic/${advanLever[0].name}/learn`)
        }
    }


    return (
        <div className='flex relative h-screen'>
            <LeftLearn dataStatusTopic={dataStatusTopic} setpopup={setpopup} setImgTopic={setImgTopic} setNameTopic={setNameTopic} totalcoin={totalcoin} />
            <RightLearn dataStatusTopic={dataStatusTopic} setNextLever={setNextLever} />
            <Link to="/" className="back-home">
                <AiFillHome />
            </Link>
            {popup && <div className='PopupTopic'>
                <div className="contenTopic">
                    <div className="wp-imgTopic">
                        <img src={imgTopic} alt="" className='imgTopic' />
                    </div>
                    <p className="m-3 text-xl font-semibold">{nameTopic}</p>
                    <p className="text-center font-medium opacity-60">Vượt qua bài kiểm tra Sơ cấp hoặc nâng cấp phiên bản Pro để mở khóa chủ đề này</p>
                    <button className="btn-Topic" onClick={() => setpopup(false)}>Hủy</button>
                </div>
            </div>}
            {nextLever && <div className='PopupTopic'>
                <div className="contenTopic">
                    <p className="m-3 text-xl font-semibold">Chúc mừng bạn vượt qua cấp độ này</p>
                    <button className="btn-Topic" onClick={() => handleNext()}>Tiếp tục</button>
                </div>
            </div>}
        </div>
    )
}

export default Learn