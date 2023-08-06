import React, { useState } from 'react'
import { BsFillStarFill } from "react-icons/bs/index"
import { CurrenUser, IEvaluate } from '../../../../type/UserModule';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {axiosPublic,axiosPrivate} from "../../../../config/ConfigApi"
import { setEvaluateApi } from "../../../../Reducer/Slice/Evaluate"
import { ToastContainer, toast } from 'react-toastify'
import { getLogin } from '../../../../Reducer/Slice/UserSlice';
const IntroConnec: React.FC = () => {
  const [rating, setRating] = useState<number | any>(null)
  const [ratingHover, setRatingHover] = useState<number | any>(null)
  const [evaluate, setEvaluate] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isEvaluate, setIsEvaluate] = useState<boolean>(false)
  const [isStar, setIsStar] = useState<boolean>(false)
  const [isEmail, setIsEmail] = useState<boolean>(false)
  const REGEX_EMAIL = /^([a-zA-Z0-9])+\@(([a-zA-Z])+\.)+([a-zA-Z]{3,4})+$/;
  const CheckEmail = REGEX_EMAIL.test(email)


  const currenUser: CurrenUser = useSelector(getLogin)
  const idUser = currenUser?.id
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formatedDate = `${year}/${month}/${day}`;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const handleEvaluate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newEvaluate: IEvaluate = {
      evaluate: evaluate,
      rating: rating,
      email: email,
      idUser: idUser,
      date: formatedDate,
    }
    if (!evaluate || !CheckEmail || !rating) {
      setIsEvaluate(true)
      setIsEmail(!CheckEmail)
      setIsStar(true)
    } else {
      if (!currenUser) return showToastUser()
      setIsEvaluate(false)
      setIsEmail(!CheckEmail)
      setIsStar(false)
      try {
        const response = await axiosPrivate.post("/evaluate/postevaluate", newEvaluate)
        dispatch(setEvaluateApi(newEvaluate))
        setEvaluate("")
        setEmail("")
        showToastsuccess()
        return response.data
      } catch (error) {
        showToastErrData(error.response?.data?.message)
        throw new Error(error)
      }
    }
  }

  const showToastsuccess = () => {
    toast.success('Tải thành công', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const showToastErrData = (err: string) => {
    toast.warning(`${err}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const showToastUser = () => {
    toast.warning(`Mời đăng nhập trước khi đánh giá `, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <section className='px-32 pt-20 pb-[88px] relative flex flex-col gap-8 items-center'>
      <ToastContainer className="text-xs font-medium" />
      <div className="text-center">
        <div className=" text-center text-4xl mb-6 font-bold ">
          <span className='text-green-500'>Liên hệ  </span>
          <span className=''>với chúng tôi</span>
        </div>
        <p className="opacity-100 text-slate-500 leading-7 font-medium text-base">Đặt câu hỏi với chúng tôi nếu bạn có thắc mắc hay không hiểu về DinoEnglish.</p>
      </div>
      <form className='my-0 mx-auto flex flex-col gap-5 w-[740px] items-center' onSubmit={handleEvaluate}>
        <div className="w-[740px] flex justify-center gap-5 ">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1
            return <label htmlFor={`ratings${i}`} key={i}>
              <input type="radio" name="rating" id={`ratings${i}`} className='hidden'
                placeholder='rating' value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <BsFillStarFill style={{ fontSize: "25px" }}
                onMouseEnter={() => setRatingHover(ratingValue)}
                onMouseLeave={() => setRatingHover(null)}
                color={ratingValue <= (rating || ratingHover) ? "#ffc107" : "#64748b"} />
            </label>
          })}
        </div>
        {isStar ? <p className='text-[#FFC107] mt-2 self-end'>Vui lòng đánh giá sao</p> : <></>}
        <textarea name="" id="" cols={80} rows={8}
          onChange={(e) => { setEvaluate(e.target.value) }}
          value={evaluate}
          placeholder='Đặt câu hỏi và góp ý cho tôi' className='shadow-lg w-full bg-white hover:shadow-xl rounded-md pt-3 border px-4 border-solid font-medium outline-none border-slate-200 ' />
        {isEvaluate ? <p className='text-[#FFC107] mt-2 self-end'>Vui lòng nhập lời nhắn</p> : <></>}
        <input placeholder='Nhập Email của bạn tại đây'
          value={email}
          type='text'
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 border-solid font-medium outline-none border-slate-200 h-14 rounded-md shadow-lg bg-white hover:shadow-xl border' />
        {isEmail ? <p className='text-[#FFC107] mt-2 self-end'>Địa chỉ email không hợp lệ.</p> : <></>}
        <button type='submit' className='landing-hover-btn h-14 ml-6 px-10 w-[144px]  outline-none text-white  font-semibold text-base'> Gửi</button>
      </form>
      <div className="hidden lg:block absolute w-56 h-56 top-[200px] left-[100px] bg-colorLandingAqua blur-[130px] rounded-full -z-10"></div>
      <div className="hidden lg:block absolute w-56 h-56 top-[100px] right-[80px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
      <div className="hidden lg:block absolute w-56 h-56 top-[100px] left-[320px] bg-colorLandingBlue blur-[130px] rounded-full -z-10"></div>
    </section>
  )
}

export default IntroConnec