import React, { useState, useEffect } from 'react'
import LeftTopic from './ComponentTopic/LeftTopic'
import RightTopic from './ComponentTopic/RightTopic'
import "./Topic.scss"
import { TopicData } from '../../../type/Topic'
import { useSelector } from 'react-redux'
import { getLogin } from '../../../Reducer/Slice/UserSlice'
import { axiosPrivate } from '../../../config/ConfigApi'

const Topic: React.FC = () => {
  const [dataTopic, setDataTopic] = useState<TopicData[]>([])
  const currenUser = useSelector(getLogin)
  const useId = currenUser.id

  // get topic
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
    <div className='flex gap-8 px-40 mt-5 mb-[100px]'>
      <LeftTopic dataTopic={dataTopic} />
      <RightTopic dataTopic={dataTopic} />
    </div>
  )
}

export default Topic