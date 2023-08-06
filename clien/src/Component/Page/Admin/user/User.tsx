import React, { useEffect, useState } from 'react'
import { AiFillLock, AiFillProfile, AiFillStar, AiFillUnlock } from 'react-icons/ai'
import "./User.scss"
import { axiosPrivate } from '../../../../config/ConfigApi'
import { useSelector } from 'react-redux'
import { IDataUser } from '../../../../type/UserModule'
import 'tippy.js/dist/tippy.css';
import { BsSearch } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { BiSolidUser } from 'react-icons/bi'
import { TbPointFilled } from "react-icons/tb"
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'

const ManagerUser: React.FC = () => {
  const [dataUser, setDataUser] = useState<IDataUser>([])
  const [name, setName] = useState<string | number>("")
  const [countUser, setCountUser] = useState<number>()
  const [countProfile, setCountProfile] = useState<number>()
  const [countEvaluate, setCountEvaluate] = useState<number>()
  const navigate = useNavigate()

  //data người dùng
  const getUser = async () => {
    try {
      const response = await axiosPrivate.get("/users")
      setDataUser(response.data)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  const limit = 10
  const paginationUser = async () => {
    try {
      const response = await axiosPrivate.get(`/profile/users?page=1&limit=${limit}`)
      console.log(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    paginationUser()
  }, [])

  // search user
  const getSearch = async () => {
    try {
      const response = await axiosPrivate.get(`/profile/search?name=${encodeURIComponent(name)}`)
      setDataUser(response.data)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    if (!name) return
    getSearch()
  }, [name])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changeValue = e.target.value
    if (!changeValue.startsWith(" ")) {
      setName(changeValue)
    }
  }

  const handleDelete = async (idUser: string) => {
    try {
      await axiosPrivate.delete(`users/delete/${idUser}`)
      getUser()
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }

  }
  // khóa người dùng
  const handleLock = async (idUser: string) => {
    try {
      await axiosPrivate.put(`users/putlock/${idUser}`)
      getUser()
    } catch (error) {
      throw new Error(error)
    }

  }

  // mở khóa người dùng
  const handleUnlock = async (idUser: string) => {
    try {
      await axiosPrivate.put(`users/putunlock/${idUser}`)
      getUser()
    } catch (error) {
      throw new Error(error)
    }

  }

  // đếm người dùng 
  const handleCountUser = async () => {
    try {
      const response = await axiosPrivate.get("/users/count")
      setCountUser(response.data)
    } catch (error) {
      throw new Error()
    }
  }
  useEffect(() => {
    handleCountUser()
  }, [])

  // đếm đánh giá 
  const handleCountEvaluate = async () => {
    try {
      const response = await axiosPrivate.get("evaluate/count")
      setCountEvaluate(response.data)
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    handleCountEvaluate()
  }, [])

  const handleCountProfile = async () => {
    try {
      const response = await axiosPrivate.get("profile/count")
      setCountProfile(response.data)
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    handleCountProfile()
  }, [])

  const handelDetail = (idUser: string) => {
    navigate(`/detailuser/${idUser}`)
  }

  const handlePagination = () => {

  }


  return (
    <div className=''>
      <div className=" h-15 flex justify-between items-center ">
        <h1 className="font-semibold text-2xl m-0  text-[#299cd9]">Quản lí học viên</h1>
        <div className="wp-search">
          <input type="text" placeholder='Nhập tên' value={name} onChange={handleChange} className='input-search' />
          <BsSearch className="text-[17px] text-white" />
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <div className="bg-white rounded-lg w-1/3 h-24 flex p-4 gap-4 items-center shadow-md hover:shadow-xl" >
          <div className="bg-green-600 text-white w-16 h-16 rounded-lg flex justify-center items-center">
            <FaUsers className="text-3xl" />
          </div>
          <div className="">
            <p className='opacity-70'>Số lượng người dùng</p>
            <div className="flex gap-3 items-center">
              <p className='text-3xl font-semibold opacity-80'>{countUser}</p>
              <BiSolidUser className="text-xl text-blue-500" />
            </div>

          </div>
        </div>
        <div className="bg-white rounded-lg w-1/3 h-24 flex p-4 gap-4 items-center shadow-md hover:shadow-xl">
          <div className="bg-yellow-500 text-white w-16 h-16 rounded-lg flex justify-center items-center">
            <AiFillStar className="text-3xl" />
          </div>
          <div className="">
            <p className='opacity-70'>Số lượng đánh giá </p>
            <div className="flex gap-3 items-center">
              <p className='text-3xl font-semibold opacity-80'>{countEvaluate}</p>
              <AiFillStar className="text-xl text-yellow-500" />
            </div>

          </div>
        </div>
        <div className="bg-white rounded-lg w-1/3 h-24 flex p-4 gap-4 items-center shadow-md hover:shadow-xl">
          <div className="bg-blue-700 text-white w-16 h-16 rounded-lg flex justify-center items-center">
            <AiFillProfile className="text-3xl" />
          </div>
          <div className="">
            <p className='opacity-70'>Số lượng hồ sơ </p>
            <div className="flex gap-3 items-center">
              <p className='text-3xl font-semibold opacity-80'>{countProfile}</p>
              <AiFillProfile className="text-xl text-blue-500" />
            </div>

          </div>
        </div>

      </div>
      <div className="bg-white rounded-md w-full  mt-5 p-5 shadow-xl">
        <table className=''>
          <thead className=' '>
            <tr className=' h-5 '>
              <th className='w-[130px]'>
                Ảnh đại diện
              </th>
              <th>
                Họ và tên
              </th>
              <th>
                Email
              </th>
              <th>
                Trạng thái
              </th>
              <th className='w-[150px]'>
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUser?.map((user) => (
              <tr key={user.id}>
                <td className='flex'>
                  {user?.avatar ?
                    <div className="w-8 h-8 mr-3 rounded-full overflow-hidden object-cover" >
                      <img src={user?.avatar} alt="" className='h-8 w-8' />
                    </div> : "Đang cập nhật"
                  }
                </td>
                <td>
                  {user.firstName || user.lastName ? <div><span>{user.firstName}</span> <span>{user.lastName}</span></div> : "Đang cập nhật"}
                </td>

                <td >
                  {user?.email}
                </td>
                <td className=''>
                  {user.status ?
                    <div className="flex items-center gap-1">
                      <TbPointFilled className="text-green-500" />
                      <span className='text-sm font-semibold' >Đang hoạt động</span>
                    </div> :
                    <div className="flex items-center gap-1">
                      <TbPointFilled className="text-red-500" />
                      <span className='text-sm font-semibold' >Đã khóa</span>
                    </div>
                  }
                </td>
                <td className='flex gap-2 items-center'>
                  <p className='bg-blue-600' onClick={() => handelDetail(user.id)}>Chi tiết</p>
                  <p className='bg-red-600' onClick={() => handleDelete(user.id)}>xóa</p>
                  {user?.status ?
                    <AiFillUnlock className="text-lg text-blue-600" onClick={() => handleLock(user.id)} />
                    :
                    <AiFillLock className="text-lg text-red-600" onClick={() => handleUnlock(user.id)} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-user">
          <Pagination defaultCurrent={1} total={50} onChange={() => handlePagination} />
        </div>
      </div>
    </div>
  )
}

export default ManagerUser