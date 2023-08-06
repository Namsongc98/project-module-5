import React, { useState, useEffect } from 'react'
import "./AdminTopic.scss"
import PostTopic from './PopupTopic/PostTopic'

import Intermediate from './Component/Intermediate';
import Advanced from './Component/Advanced';
import Beginner from './Component/Beginner';
import { axiosPrivate } from '../../../../config/ConfigApi';
import { useDispatch } from 'react-redux';
import { setAllTopic } from '../../../../Reducer/Slice/UseTopic';
import { MdOutlineTopic, MdTopic } from 'react-icons/md';

const AdminTopic: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const getAllTopic = async () => {
      try {
        const response = await axiosPrivate.get("/topic/getalltopic");
        dispatch(setAllTopic(response.data))
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    }
    getAllTopic()
  }, [])



  return (
    <div className='w-full'>
      {popup && <PostTopic propSetPopup={setPopup} />}
      <div className="flex justify-between">
        <p className='font-semibold text-2xl m-0 text-[#299cd9]'>Chủ đề</p>
        <div className="btn-popup-topic" onClick={() => setPopup(true)}>
          <MdTopic />
          <span className=''>Thêm chủ đề</span>
        </div>
      </div>
      <div className="flex gap-5 mt-5 w-full">
        <Beginner popup={popup} />
        <Intermediate popup={popup} />
        <Advanced popup={popup} />
      </div>
    </div>
  )
}

export default AdminTopic