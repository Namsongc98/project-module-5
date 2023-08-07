import React, { useState, useEffect } from 'react'
import advanced from "../../../../../assets/img/ic_advanced.webp"
import { DataBeginner } from '../../../../../type/Topic'
import {axiosPrivate} from '../../../../../config/ConfigApi'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import EditTopic from '../PopupTopic/EditTopic'
import { BiDetail } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setTopicAdvanced } from '../../../../../Reducer/Slice/UseTopic'

type Popup = {
  popup: boolean
}
const Advanced: React.FC<Popup> = ({ popup }) => {
  const [dataAdvanced, setAdvances] = useState<DataBeginner>([])
  const [idTonggle, setidTonggle] = useState<number | undefined>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 
  const getIntermediate = async () => {
    try {
      const response = await axiosPrivate.get("/topic/getadvances")
      dispatch(setTopicAdvanced(response.data))
      setAdvances(response.data)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    getIntermediate()
  }, [popup])

  const handleDelete = async (idTopic: number) => {
    try {
      await axiosPrivate.delete(`/topic/delete/${idTopic}`);
      showToastsuccess();
      getIntermediate();
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  };

  const showToastsuccess = () => {
    toast.success("xóa thành công", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleEdit = (idTopic: number) => {
    setidTonggle(idTopic)
  }
  const handleDetail = (idTopic: number) => {
    navigate(`/detailtopic/${idTopic}`)
  }
  return (
    <div className="w-[100%]">
      <ToastContainer className="text-xs font-medium" />
      <div className=" bg-white rounded-xl p-5 flex items-center flex-col ">
        <div className="">
          <img src={advanced} alt="" className='w-10 ' />
        </div>
        <p className='font-semibold text-2xl opacity-50'>Cao Cấp</p>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {dataAdvanced?.map((advanced) => (
          <div key={advanced.id} className="flex bg-white items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
            <div className="">
              <img src={advanced.image} alt="" className='w-16 h-16' />
            </div>
            <div className="">
              <p className="font-semibold text-xl">{advanced.name}</p>
              <p className="font-semibold opacity-60 mt-2">{advanced.target}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className="text-green-400 hover:text-green-600"
              >
                <BiDetail onClick={() => handleDetail(advanced.id!)} />
              </div>
              <div
                className="text-blue-400 hover:text-blue-600"
              >
                <AiFillEdit onClick={() => handleEdit(advanced.id!)} />
              </div>

              <div
                className="text-red-400 hover:text-red-600"

              >
                <AiTwotoneDelete onClick={() => handleDelete(advanced.id!)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {idTonggle &&
        <EditTopic isToggle={setidTonggle} idBeginer={idTonggle!} />
      }
    </div>
  )
}

export default Advanced