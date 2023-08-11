import React, { useState, useEffect } from 'react'

import LeftLearn from './componentLearn/LeftLearn'
import RightLearn from './componentLearn/RightLearn'
import { axiosPrivate } from '../../../../config/ConfigApi'
import { TopicData } from '../../../../type/Topic'
import { useSelector } from 'react-redux'
import { getLogin } from '../../../../Reducer/Slice/UserSlice'
import { AiFillHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Learn: React.FC = () => {
    const currenUser = useSelector(getLogin)
    const useId = currenUser.id
    const [dataTopic, setDataTopic] = useState<TopicData[]>([])
    const [popup, setpopup] = useState(false)
    const [imgTopic, setImgTopic] = useState("")
    const [nameTopic, setNameTopic] = useState("")

    const getTopic = async () => {
        try {
            const response = await axiosPrivate.get(`/status/topic/${useId}`)
            setDataTopic(response.data)
            return response.data
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(() => {
        getTopic()
    }, [])

    return (
        <div className='flex relative h-screen'>
            <LeftLearn dataTopic={dataTopic} setpopup={setpopup} setImgTopic={setImgTopic} setNameTopic={setNameTopic} />
            <RightLearn dataTopic={dataTopic} />
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
        </div>
    )
}

export default Learn