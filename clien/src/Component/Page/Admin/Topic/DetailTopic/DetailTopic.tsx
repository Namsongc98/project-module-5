import React, { useState, useEffect } from 'react'
import FormQuestion from './FormQuestion'
import "./Detail.scss"
import { AiFillDelete, AiFillEdit, AiFillQuestionCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import {axiosPrivate} from '../../../../../config/ConfigApi'
import { ToastContainer, toast } from 'react-toastify'
import FromEdit from './FromEdit'
import { IQuestion } from '../../../../../type/Topic'
import { FaQuestionCircle } from 'react-icons/fa'


const DetailTopic: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false)
  const [dataQuestion, setDataQuestion] = useState<IQuestion[]>([])
  const [topic, setTopic] = useState<any>()
  const [countQuestion, setCountQuestion] = useState<any>()

  const [idTonggle, setidTonggle] = useState<number | undefined>()
  const { id } = useParams()

  //lấy getquestion theo id topic 
  const getQuesttion = async () => {
    const idTopic: string = id!
    try {
      const response = await axiosPrivate.get(`/question/getquestion/${idTopic}`)
      setDataQuestion(response.data.question)
      setTopic(response.data.topic)
      setCountQuestion(response.data.count)

      return response.data
    } catch (error) {
      throw new Error()
    }
  }

  useEffect(() => {
    getQuesttion()
  }, [idTonggle, popup])

  const handleDelete = async (idTopic: number) => {
    try {
      await axiosPrivate.delete(`/question/${idTopic}`);
      showToastsuccess();
      getQuesttion()
    } catch (error) {
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
  return (
    <div className='w-full'>
      {popup && <FormQuestion setPopup={setPopup} />}
      <ToastContainer className="text-xs font-medium" />
      <div className="flex justify-between items-center">
        <p className='font-semibold text-2xl m-0 text-[#299cd9]'>Câu hỏi theo chủ đề</p>
        <div onClick={() => setPopup(true)} className='btn-popup-topic'>
          <FaQuestionCircle />
          <div >Thêm câu hỏi</div>
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <div className="rounded-lg w-1/3 h-24 flex p-4 gap-4 items-center shadow-md hover:shadow-xl bg-[#626ed4]" >
          <div className=" text-white w-16 h-16 rounded-lg flex justify-center items-center">
            <img src={topic?.image} alt="" className='' />
          </div>
          <div className=" flex flex-col  ">
            <p className='font-semibold text-white text-lg'>Chủ đề: <span>{topic?.name}</span> </p>
            <div className="flex gap-3 items-center justify-center">
              <span className='font-semibold text-white text-base '>{topic?.target}</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg w-1/3 h-24 flex p-4 gap-4 items-center shadow-md hover:shadow-xl bg-green-600" >
          <div className=" text-white w-16 h-16 rounded-lg flex justify-center items-center">
            <AiFillQuestionCircle className="text-7xl text-yellow-500" />
          </div>
          <div className=" flex flex-col text-lg ">
            <p className='font-semibold text-white'>Số lượng câu hỏi </p>
            <div className="flex gap-3 items-center justify-center">
              <span className='font-semibold text-white text-2xl '>{countQuestion}</span>
              <AiFillQuestionCircle className="text-xl text-yellow-500" />
            </div>

          </div>
        </div>

      </div>

      <div className="mt-5 w-full">
        <div className=" wp-table">
          <table className='w-full detail-table'>
            <thead className='detail-thead'>
              <tr className=' '>
                <th className='w-10'>
                  stt
                </th>
                <th>
                  Câu hỏi
                </th>
                <th>
                  Câu A
                </th>
                <th>
                  Câu B
                </th>
                <th>
                  Câu C
                </th>
                <th>
                  Câu D
                </th>
                <th className='w-[150px]'>
                  Đáp án đúng
                </th>
                <th className='w-[150px]'>
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {dataQuestion?.map((question, index) => (
                <tr key={index}>
                  <td>
                    {question.id}
                  </td>
                  <td>
                    {question.question}
                  </td>
                  <td>
                    {question.option_a}
                  </td>
                  <td>
                    {question.option_b}
                  </td>
                  <td>
                    {question.option_c}
                  </td>
                  <td>
                    {question.option_d}
                  </td>
                  <td>
                    {question.answer}
                  </td>
                  <td className='flex gap-4'>
                    <div className="text-blue-400 hover:text-blue-600 ">
                      <AiFillEdit style={{ fontSize: "20px" }} onClick={() => handleEdit(question.id!)} />
                    </div>
                    <div className="text-red-400 hover:text-red-600">
                      <AiFillDelete style={{ fontSize: "20px" }} onClick={() => handleDelete(question.id!)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {idTonggle &&
            <FromEdit isToggle={setidTonggle} idBeginer={idTonggle} />
          }
        </div>
      </div>
    </div>
  )
}

export default DetailTopic