import React, { useState, useEffect } from 'react'

import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'

import { axiosPrivate } from '../../../../../config/ConfigApi'
import beginner from "../../../../../assets/img/ic_beginner.webp";
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import EditTopic from '../PopupTopic/EditTopic';
import { DataBeginner } from '../../../../../type/Topic';
import { BiDetail } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import { getLogin } from '../../../../../Reducer/Slice/UserSlice';
type Popup = {
  popup: boolean
}
const Beginner: React.FC<Popup> = ({ popup }) => {
  const [dataBeginer, setDataBeginer] = useState<DataBeginner>([]);
  const [idTonggle, setidTonggle] = useState<number | undefined>()
  const currenUser = useSelector(getLogin)
  const idUser = currenUser.id;

  const navigate = useNavigate()

  // datatopic beginner
  const getBeginner = async () => {
    try {
      const response = await axiosPrivate.get(`/topic/getbeginner/`);
      setDataBeginer(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    getBeginner();
  }, [popup]);

  //  handleDelete

  const handleDelete = async (idTopic: number) => {
    try {
      await axiosPrivate.delete(`/topic/delete/${idTopic}`);
      showToastsuccess();
      getBeginner();
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
    <div className="w-[100%] ">
      <ToastContainer className="text-xs font-medium" />
      <div className=" bg-white rounded-xl p-5 flex items-center flex-col ">
        <div className="">
          <img src={beginner} alt="" className="w-10 " />
        </div>
        <p className="font-semibold text-2xl opacity-50">Sơ Cấp</p>
      </div>
      <div className="mt-5 flex flex-col gap-2 ">
        {dataBeginer?.map((itemBeginner, id) => (
          <div
            key={id}
            className="flex  bg-white items-center justify-between p-4  border-solid border-slate-200 hover:scale-[101%] hover:shadow-lg rounded-lg border-[1px]"
          >
            <div className="">
              <img
                src={itemBeginner.image}
                alt=""
                className="w-16 h-16"
              />
            </div>
            <div className="">
              <p className="font-semibold text-xl">
                {itemBeginner.name}
              </p>
              <p className="font-semibold opacity-60 mt-2">
                {itemBeginner.target}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="text-green-400 hover:text-green-600"
                onClick={() => handleDetail(itemBeginner.id!)}
              >
                <BiDetail />
              </div>
              <div
                className="text-blue-400 hover:text-blue-600"
                onClick={() => handleEdit(itemBeginner.id!)}
              >
                <AiFillEdit />
              </div>

              <div
                className="text-red-400 hover:text-red-600"
                onClick={() => handleDelete(itemBeginner.id!)}
              >
                <AiTwotoneDelete />
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

export default Beginner