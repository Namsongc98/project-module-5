import React, { ChangeEvent, useEffect, useState } from "react";
import imgUser from "../../../assets/img/download_user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CurrenUser, IProfile } from "../../../type/UserModule";
import imgUpload from "../../../assets/img/upanh.png";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getLogin, logout } from "../../../Reducer/Slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getProfile, setProfile } from "../../../Reducer/Slice/Profile";
import "./profile.scss";
import axios from "axios";
import { axiosPrivate, axiosPublic } from "../../../config/ConfigApi";
const ProfileUser: React.FC = () => {
    const profile: IProfile = useSelector(getProfile);
    const currenEmail = useSelector(getLogin)
    const [firstName, setFirstname] = useState<string>(profile?.firstName || "");
    const [lastName, setlastname] = useState<string>(profile?.lastName || "");
    const [age, setAge] = useState<string>(profile?.age || "");
    const [phone, setPhone] = useState<string>(profile?.phone || "");
    const [gender, setGender] = useState<string>(profile?.gender || "");
    const [avatar, setAvatar] = useState<any>(profile?.avatar);
    const [loading, setLoading] = useState(false)
    const [avatarView, setAvatarView] = useState<any>();
    const [popup, setPopup] = useState<boolean>(false)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate()
    const currenUser: CurrenUser = useSelector(getLogin)


    // ép nhận số phone và number
    const handleInputPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/\D/g, '');
        setPhone(numericValue);
    };
    const handleInputAge = (event: ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/\D/g, '');
        setAge(numericValue);
    };

    // avatar input
    const handeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const fileView: any = e.target.files[0];
        setAvatar(fileView);
        fileView.preview = URL.createObjectURL(fileView);
        setAvatarView(fileView);
    };


    // data frofile
    const handleFrofile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!avatar || !(avatar instanceof File)) {
                setLoading(false)
                return showToasterrData("Vui lòng chọn một tệp hợp lệ cho hình đại diện.")
            }
            const avatarData = new FormData();
            avatarData.append("file", avatar);
            avatarData.append("upload_preset", "dinoEnglish");
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dlb1ac5xw/image/upload",
                avatarData
            )
            const newProfile = {
                userId: currenUser.id,
                firstName,
                lastName,
                age,
                phone,
                gender,
                avatar: response.data.secure_url
            }
            const Response = await axiosPublic.post("profile/save", newProfile)
            dispatch(setProfile(Response.data))
            setLoading(false)
            const successprofile = Response.data.message
            showToastSuccessData(successprofile)
        } catch (error) {
            setLoading(false)
            const errordata: any = error.response.data.message
            return showToasterrData(errordata)
        }
    };

    //  avatar preview
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatarView?.preview);
        };
    }, [avatarView]);

    //reset input
    const handelCancle = () => {
        const revokeimg = URL.revokeObjectURL(avatarView?.preview);
        setFirstname("");
        setlastname("");
        setAge("");
        setPhone("");
        setAvatarView(revokeimg);
    };

    // dăng xuất
    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(logout());
        navigate("/login")
    };

    const showToastSuccessData = (successData: string) => {
        toast.success(successData, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const showToasterrData = (errData: string) => {
        toast.warning(errData, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    // handle đổi mật khẩu
    const REGEX_PASSWORD = /^([a-zA-Z0-9)]{6,20})$/;
    const handlePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!REGEX_PASSWORD.test(password))
            return showToastValiPassword()
        if (!REGEX_PASSWORD.test(newPassword))
            return showToastValiPassword()
        if (newPassword !== confirmPassword)
            return showToastMathPassword()
        const changePassword = {
            id: currenUser.id,
            password,
            newPassword: confirmPassword
        }
        try {
            await axiosPrivate.put("users/updatepassword", changePassword)
            showToastSuccessPassword("Đổi mật khẩu thành công")
            setTimeout(() => {
                handleLogout()
            }, 2000)
        } catch (error) {
            showToastErrData(error.response.data.message)
        }

    }

    const showToastValiPassword = () => {
        toast.warning('Mật khẩu chứa 6 - 20 kí tự không chứa kí tự đặc biệt', {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const showToastMathPassword = () => {
        toast.warning('Xác nhận lại mật khẩu', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const showToastErrData = (errLogin: string) => {
        toast.warning(`${errLogin}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const showToastSuccessPassword = (successData: string) => {
        toast.success(successData, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    return (
        <div className="relative">
            <ToastContainer className="text-xs font-medium" />
            <div className="bg-slate-100 flex gap-5 p-8 ">
                <div className=" bg-white w-[20%] p-10 ">
                    <div className="mx-auto">
                        <div className=" w-[5em] h-[5em] rounded-[50%]  overflow-hidden mx-auto ">
                            {profile?.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt=""
                                    className="h-[5em] w-[5em] object-cover"
                                />
                            ) : (
                                <img src={imgUser} alt="" className="h-[5em] object-cover" />
                            )}
                        </div>
                        <p className=" text-center font-semibold text-xl mt-5 opacity-70">
                            {" "}
                            {profile?.firstName} {profile?.lastName}{" "}
                        </p>
                        <p className="text-center font-normal text-base opacity-70">
                            {currenEmail?.email}
                        </p>
                    </div>
                </div>
                <div className=" w-[100%]">
                    <div className="bg-white w-[100%] px-4 py-4">
                        <h2 className=" font-semibold text-xl mb-5">Chi tiết bản thân</h2>
                        <form
                            action=""
                            className="form-container"
                            onSubmit={handleFrofile}
                        >
                            <div className="wp-form-left">
                                <div className="wp-input">
                                    <label htmlFor="firstname" className="form-label ">
                                        {" "}
                                        Họ:
                                    </label>{" "}
                                    <br />
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        placeholder=""
                                        className="form-input"
                                        value={firstName}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </div>
                                <div className="wp-input">
                                    <label htmlFor="lastname" className="form-label  ">
                                        Tên:

                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        placeholder=""
                                        className="form-input"
                                        value={lastName}
                                        onChange={(e) => setlastname(e.target.value)}
                                    />
                                </div>
                                <div className="wp-input">
                                    <label className="">
                                        <select id="gender" aria-label="gender" name="gender" onChange={(e) => setGender(e.target.value)} className="form-select" >
                                            <option > --Giới tính--</option>
                                            <option value={"Nam"}>Nam</option>
                                            <option value={"Nữ"}>Nữ</option>
                                        </select>
                                    </label>
                                </div>

                                <div className=" mt-7 wp-btn">
                                    {loading ?
                                        <div className=" btn-save"><div className="ring-loading"></div></div>
                                        :
                                        <button type="submit" className=" btn-save">Lưu</button>
                                    }
                                    <button
                                        type="reset"
                                        className=" btn-Cancel"
                                        onClick={handelCancle}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="wp-form-left">
                                <div className="wp-input">
                                    <label htmlFor="age" className="form-label">
                                        Tuổi:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="age"
                                        min={0}
                                        name="age"
                                        placeholder=""
                                        className="form-input"
                                        value={age}
                                        onChange={handleInputAge}
                                    />
                                </div>
                                <div className="wp-input">
                                    <label htmlFor="phone" className="form-label">
                                        Số điện thoại:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        inputMode="numeric"
                                        placeholder=""
                                        className="form-input"
                                        value={phone}
                                        onChange={handleInputPhone}
                                    />
                                </div>
                            </div>
                            <div className="wp-right">
                                <div className="wp-avatar overflow-hidden">
                                    {avatarView?.preview ? (
                                        <img
                                            src={avatarView?.preview}
                                            alt=""
                                            className="avatar-view mx-auto "
                                        />
                                    ) : (
                                        <img
                                            src={imgUpload}
                                            alt=""
                                            className="mx-auto  w-20 mt-[35%]"
                                        />
                                    )}
                                </div>

                                <label htmlFor="avatar" className="label-avatar">
                                    <span>Add Avatar</span>
                                    <input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        placeholder="avatar"
                                        onChange={handeAvatar}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className=" w-[100%] bg-white px-12 py-4 mt-5">
                        <div className="">
                            <h1 className=" text-2xl font-semibold text-gray-500 mb-2">
                                Tiến độ học
                            </h1>
                            <div className="font-medium text-xl flex justify-between items-center my-4">
                                <p className="">Tổng kinh nghiệm</p>
                                <p className=" text-yellow-400">5 exp</p>
                            </div>
                            <div className="w-[100%] line-midleware mx-auto max-w-[1600px]" />
                            <div className="font-medium text-xl flex justify-between items-center my-4">
                                <p className="">Chủ đề đã hoàn thành</p>
                                <p className="text-blue-500">0/30</p>
                            </div>
                            <div className="w-[100%] line-midleware mx-auto max-w-[1600px]" />
                            <div className="font-medium text-xl flex justify-between items-center my-4">
                                <p className="">Bài kiểm tra đã hoàn thành</p>
                                <p className="text-red-500">0/3</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h1 className=" text-2xl font-semibold text-gray-500 mb-2">
                                Tài khoản
                            </h1>
                            <div className="font-medium text-xl flex justify-between items-center my-4">
                                <p className="">Email</p>
                                <p className=" text-yellow-400">{currenEmail?.email}</p>
                            </div>
                            <div className="w-[100%] line-midleware mx-auto max-w-[1600px]" />
                            <div
                                className=" font-medium text-xl my-4  flex justify-between items-center"
                            >
                                <div onClick={handleLogout} className="cursor-pointer">
                                    {" "}
                                    Đăng xuất

                                </div>
                                <div className="cursor-pointer" onClick={() => setPopup(!popup)}  >
                                    Đổi mật khẩu
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form className={` ${popup ? "openPopup" : "closePopup"}`} onSubmit={(e) => handlePassword(e)}>
                <h1 className=""> Đổi mật khẩu</h1>
                <div className="password">
                    <label htmlFor="password">Mật khẩu cũ:</label>
                    <div className="wp-input">
                        <input type="text" className="" id="password" name="confirmPassword"
                            value={password} onChange={(e) => setPassword(e.target.value)} />

                    </div>
                </div>
                <div className="password">
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <div className="wp-input">
                        <input type="text" className="" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="confirmPassword">Xác nhận lại:</label>
                    <div className="wp-input">
                        <input type="text" className="" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    </div>
                </div>
                <div className="wp-button">
                    <button className="btn-save" type="submit" >Lưu</button>
                    <div className="btn-cancel" onClick={() => setPopup(!popup)}>Hủy</div>
                </div>
            </form>


        </div>
    );
};

export default ProfileUser;
