import React, { useState, useEffect } from 'react'
import intermediate from "../../../../../assets/img/ic_intermediate.webp"
import { DataBeginner } from '../../../../../type/Topic'
import {axiosPrivate} from '../../../../../config/ConfigApi'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import EditTopic from '../PopupTopic/EditTopic'
import { BiDetail } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setTopicIntermediate } from '../../../../../Reducer/Slice/UseTopic'

type Popup = {
  popup: boolean
}
const Intermediate: React.FC<Popup> = (popup) => {
  const [dataIntermediate, setDataIntermediate] = useState<DataBeginner>([])
  const [idTonggle, setidTonggle] = useState<number | undefined>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // lấy dữ liệu trung cấp
  const getIntermediate = async () => {
    try {
      const response = await axiosPrivate.get("/topic/getintermediate")
      dispatch(setTopicIntermediate(response.data))
      setDataIntermediate(response.data)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    getIntermediate()
  }, [popup])

  // xóa dữ liệu
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
          <img src={intermediate} alt="" className='w-10 ' />
        </div>
        <p className='font-semibold text-2xl opacity-50'>Trung Cấp</p>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {dataIntermediate?.map((intermediate) => (
          <div key={intermediate.id} className="flex bg-white items-center justify-between p-4 wp-card-topic border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]">
            <div className="">
              <img src={intermediate.image} alt="" className='w-16 h-16' />
            </div>
            <div className="">
              <p className="font-semibold text-xl">{intermediate.name}</p>
              <p className="font-semibold opacity-60 mt-2">{intermediate.target}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="text-green-400 hover:text-green-600"
              >
                <BiDetail onClick={() => handleDetail(intermediate.id!)} />
              </div>
              <div
                className="text-blue-400 hover:text-blue-600"
              >
                <AiFillEdit onClick={() => handleEdit(intermediate.id!)} />
              </div>
              <div
                className="text-red-400 hover:text-red-600"
              >
                <AiTwotoneDelete onClick={() => handleDelete(intermediate.id!)} />
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

export default Intermediate