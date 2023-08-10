import React, { useEffect, useState } from 'react'
import "../Learn.scss"
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../../../../../config/ConfigApi'
import { TopicData } from '../../../../../type/Topic'
type propData = {
    dataTopic: TopicData[]
}
const RightLearn: React.FC<propData> = () => {
    const [questions, setquestion] = useState([])

    const { id } = useParams()


    const getQuestion = async () => {
        try {
            const response = await axiosPrivate.get(`/question/getnamequestion/${id}`)
            setquestion(response.data)
        } catch (error) {
            throw new Error(error)
        }
    }
    console.log(questions)
    useEffect(() => {
        getQuestion()
    }, [])
    return (
        <div className='text-center w-full'></div>
    )
}

export default RightLearn