import React from 'react'
import "./detail.scss"
import logo from "../../../../../assets/img/imageLogo.webp"
import { useNavigate, useParams } from 'react-router-dom'
const DetailUser: React.FC = () => {
    const { id } = useParams();
    console.log(id)

    return (
        <div className='container-detail-profile'>
            <div className="wp-profile">
                {/* profile left */}
                <div className="wp-profile-left">
                    <div className="wp-avatar">
                        <img src={logo} alt="" className='avatar-user' />
                    </div>
                    <div className="wp-text-profile ">
                        <p className="profile-name">hello</p>
                        <p className="profile-email">hello</p>
                    </div>
                </div>
                {/* Profile right */}
                <div className="wp-profile-right">
                    <table className='table-profile'>
                        <tbody className='tbody-profile'>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Họ và tên
                                </td>
                                <td >
                                    Họ và tên
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Giới tính
                                </td>
                                <td >
                                    Nam
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Phone
                                </td>
                                <td>
                                    0989765
                                </td>
                            </tr>
                            <tr className='tr-profile'>
                                <td className='td-profile'>
                                    Tuổi
                                </td>
                                <td>
                                    0989765
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* learn */}
            <div className="container-detail-learn">
                {/* Topic */}
                <div className="wp-beginner">
                    <div className="wp-lever">
                        <div className="wp-image-lever">
                            <img src={logo} alt="" className="img-lever" />
                        </div>
                        <p className="lever-title">Sơ Cấp</p>
                    </div>
                    {/* List Topic */}
                    <div className="wp-list-topic">
                        <div className="wp-item-topic">
                            <div className="wp-title-topic">
                                <div className="wp-img-topic">
                                    <img src={logo} alt="" className='img-topic' />
                                </div>
                                <div className="wp-text-topic">
                                    <p className='name-topic'>hello</p>
                                    <p className='target-topic'>am/is/are</p>

                                </div>
                            </div>

                            <span className='poin-topic'>20px</span>


                        </div>

                        <div className="wp-item-topic">
                            <div className="wp-title-topic">
                                <div className="wp-img-topic">
                                    <img src={logo} alt="" className='img-topic' />
                                </div>
                                <div className="wp-text-topic">
                                    <p className='name-topic'>hello</p>
                                    <p className='target-topic'>am/is/are</p>

                                </div>
                            </div>

                            <span className='poin-topic'>20px</span>


                        </div>


                    </div>
                </div>
                <div className="wp-beginner">
                    <div className="wp-lever">
                        <div className="wp-image-lever">
                            <img src={logo} alt="" className="img-lever" />
                        </div>
                        <p className="lever-title">Sơ Cấp</p>
                    </div>
                    {/* List Topic */}
                    <div className="wp-list-topic">
                        <div className="wp-item-topic">
                            <div className="wp-title-topic">
                                <div className="wp-img-topic">
                                    <img src={logo} alt="" className='img-topic' />
                                </div>
                                <div className="wp-text-topic">
                                    <p className='name-topic'>hello</p>
                                    <p className='target-topic'>am/is/are</p>

                                </div>
                            </div>

                            <span className='poin-topic'>20px</span>


                        </div>

                        <div className="wp-item-topic">
                            <div className="wp-title-topic">
                                <div className="wp-img-topic">
                                    <img src={logo} alt="" className='img-topic' />
                                </div>
                                <div className="wp-text-topic">
                                    <p className='name-topic'>hello</p>
                                    <p className='target-topic'>am/is/are</p>

                                </div>
                            </div>

                            <span className='poin-topic'>20px</span>


                        </div>


                    </div>
                </div>
                <div className="wp-beginner">
                    <div className="wp-lever">
                        <div className="wp-image-lever">
                            <img src={logo} alt="" className="img-lever" />
                        </div>
                        <p className="lever-title">Sơ Cấp</p>
                    </div>
                    {/* List Topic */}
                    <div className="wp-list-topic">
                        <div className="wp-item-topic">
                            <div className="wp-title-topic">
                                <div className="wp-img-topic">
                                    <img src={logo} alt="" className='img-topic' />
                                </div>
                                <div className="wp-text-topic">
                                    <p className='name-topic'>hello</p>
                                    <p className='target-topic'>am/is/are</p>

                                </div>
                            </div>

                            <span className='poin-topic'>20px</span>


                        </div>

                        <div className="wp-item-topic">
                            <div className="wp-title-topic">
                                <div className="wp-img-topic">
                                    <img src={logo} alt="" className='img-topic' />
                                </div>
                                <div className="wp-text-topic">
                                    <p className='name-topic'>hello</p>
                                    <p className='target-topic'>am/is/are</p>

                                </div>
                            </div>

                            <span className='poin-topic'>20px</span>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUser