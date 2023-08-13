import React, { useEffect, useState } from 'react'
import "./detail.scss"
import beginnerImg from "../../../../../assets/img/ic_beginner.webp"
import interImg from "../../../../../assets/img/ic_intermediate.webp"
import advanImg from "../../../../../assets/img/ic_advanced.webp"
import avatar from "../../../../../assets/img/default-avatar-profile-icon-of-social-media-user-vector.jpg"
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../../../../../config/ConfigApi'
import { IProfile, UserEvaluate } from '../../../../../type/UserModule'
import { TopicData } from '../../../../../type/Topic'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { BsFillStarFill } from 'react-icons/bs'



const DetailUser: React.FC = () => {
    const [dataTopic, setDataTopic] = useState<TopicData[]>([])
    const [evaluate, setEvaluate] = useState<UserEvaluate>()
    const [profile, setProfile] = useState<IProfile>()

    const { id } = useParams();
    const dataUser = async () => {
        try {
            const response = await axiosPrivate.get(`/users/userdetail/${id}`)
            setDataTopic(response.data.statusTopic)
            setEvaluate(response.data.evaluate)
            setProfile(response.data.profile)
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(() => {
        dataUser()
    }, [])
    const dataBeginner = dataTopic.filter((topic) => topic.lever === "Sơ cấp")
    const dataInter = dataTopic.filter((topic) => topic.lever === "Trung cấp")
    const dataBegAdvan = dataTopic.filter((topic) => topic.lever === "Cao cấp")

    // khóa người dùng
    const handleLock = async (idUser: string) => {
        try {
            await axiosPrivate.put(`users/putlock/${idUser}`)
            dataUser()
        } catch (error) {
            throw new Error(error)
        }

    }

    // mở khóa người dùng
    const handleUnlock = async (idUser: string) => {
        try {
            await axiosPrivate.put(`users/putunlock/${idUser}`)
            dataUser()
        } catch (error) {
            throw new Error(error)
        }
    }

    console.log(evaluate?.evaluate)
    return (
        <div className='container-detail-profile'>
            <div className="wp-profile">
                {/* profile left */}
                <div className="wp-profile-left">
                    <div className="wp-avatar">
                        {profile?.avatar ?
                            <img src={profile?.avatar} alt="" className='avatar-user' /> :
                            <img src={avatar} alt="" className='avatar-user' />
                        }
                    </div>
                    <div className="wp-text-profile ">
                        <p className="profile-name">{profile?.firstName} {profile?.lastName}</p>
                        <p className="profile-email">{evaluate?.email}</p>
                    </div>
                    <div className="wp-lock">
                        {profile?.status ?
                            <div className="lock openKey " onClick={() => handleLock(id!)}>
                                <AiFillUnlock className="text-lg  text-white" />
                            </div> :
                            <div className="lock unlock" onClick={() => handleUnlock(id!)} >
                                <AiFillLock className="text-lg  text-white" />
                            </div>
                        }
                        <div className="lock evaluete  cursor-pointer">
                            Đánh giá
                        </div>
                    </div>
                </div>
                {/* Profile right */}
                <div className="wp-profile-right">
                    <table className='table-profile'>
                        <tbody className='tbody-profile'>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Họ và tên:
                                </td>
                                <td >
                                    {profile?.firstName} {profile?.lastName}
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Vai trò:
                                </td>
                                <td >
                                    {profile?.role === "adimn" ? "Quản lí" : "Người dùng"}
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Giới tính:
                                </td>
                                <td >
                                    {profile?.gender}
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Phone:
                                </td>
                                <td>
                                    {profile?.phone}
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Tuổi:   
                                </td>
                                <td>
                                    {profile?.age}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="min-h-[100px] mt-5">
                        <table className=''>
                            <thead className=' '>
                                <tr className=' h-5 '>
                                    <th className='w-[150px]'>
                                        Thời gian đánh giá
                                    </th>
                                    <th>
                                        Số lượng sao
                                    </th>
                                    <th>
                                        Đánh giá
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluate?.evaluate?.map((evaluate) => (
                                    <tr >
                                        <td >
                                            {evaluate?.date}
                                        </td>
                                        <td className='flex gap-1 text-yellow-400'>
                                            {[...Array(evaluate.rating)].map((_, index) => (
                                                <BsFillStarFill key={index} />
                                            ))}
                                        </td>
                                        <td >
                                            {evaluate?.evaluate}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* learn */}
            <div className="container-detail-learn">
                {/* Topic */}
                <div className="wp-beginner">
                    <div className="wp-lever">
                        <div className="wp-image-lever">
                            <img src={beginnerImg} alt="" className="img-lever" />
                        </div>
                        <p className="lever-title">Sơ Cấp</p>
                    </div>
                    {/* List Topic */}
                    <div className="wp-list-topic">
                        {dataBeginner.map((beginner) => (
                            <div className="wp-item-topic">
                                <div className="wp-title-topic">
                                    <div className="wp-img-topic">
                                        <img src={beginner.image} alt="" className='img-topic' />
                                    </div>
                                    <div className="wp-text-topic">
                                        <p className='name-topic'>{beginner.name}</p>
                                        <p className='target-topic'>{beginner.target}</p>

                                    </div>
                                </div>
                                <span className='poin-topic'>{beginner.poiter} exp</span>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="wp-beginner">
                    <div className="wp-lever">
                        <div className="wp-image-lever">
                            <img src={interImg} alt="" className="img-lever" />
                        </div>
                        <p className="lever-title">Trung Cấp</p>
                    </div>
                    {/* List Topic */}
                    <div className="wp-list-topic">
                        {dataInter.map((beginner) => (
                            <div className="wp-item-topic">
                                <div className="wp-title-topic">
                                    <div className="wp-img-topic">
                                        <img src={beginner.image} alt="" className='img-topic' />
                                    </div>
                                    <div className="wp-text-topic">
                                        <p className='name-topic'>{beginner.name}</p>
                                        <p className='target-topic'>{beginner.target}</p>

                                    </div>
                                </div>
                                <span className='poin-topic'>{beginner.poiter} exp</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="wp-beginner">
                    <div className="wp-lever">
                        <div className="wp-image-lever">
                            <img src={advanImg} alt="" className="img-lever" />
                        </div>
                        <p className="lever-title">Cao Cấp</p>
                    </div>
                    {/* List Topic */}
                    <div className="wp-list-topic">
                        {dataBegAdvan.map((beginner) => (
                            <div className="wp-item-topic">
                                <div className="wp-title-topic">
                                    <div className="wp-img-topic">
                                        <img src={beginner.image} alt="" className='img-topic' />
                                    </div>
                                    <div className="wp-text-topic">
                                        <p className='name-topic'>{beginner.name}</p>
                                        <p className='target-topic'>{beginner.target}</p>

                                    </div>
                                </div>
                                <span className='poin-topic'>{beginner.poiter} exp</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUser