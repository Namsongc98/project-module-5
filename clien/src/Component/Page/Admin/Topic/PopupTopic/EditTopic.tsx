import React, { useState, ChangeEvent, useEffect, FormEvent, Dispatch, SetStateAction } from 'react'
import { WiStars } from 'react-icons/wi'
import { ToastContainer, toast } from 'react-toastify'
import {axiosPrivate} from '../../../../../config/ConfigApi'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../AdminTopic.scss'
import { getAllTopic } from '../../../../../Reducer/Slice/UseTopic';
import { useSelector } from 'react-redux';
interface IPropPopup {
  isToggle: Dispatch<SetStateAction<any>>,
  idBeginer: number,
}
interface ITopic {
  id: number
  id_topic_user?: string | null
  image: string
  lever: string
  name: string
  status?: number | null
  target: string
}
const EditTopic: React.FC<IPropPopup> = ({ isToggle, idBeginer }) => {
  const allTopic: Array<ITopic> = useSelector(getAllTopic)
  const findTopicId: ITopic | undefined = allTopic.find((topic) => topic.id === idBeginer);
  const [nameTopic, setNameTopic] = useState(findTopicId?.name!);
  const [targetTopic, setTopicTarget] = useState(findTopicId?.target!);
  const [leverTopic, setLeverTopic] = useState(findTopicId?.lever);
  const [imgTopic, setImgTopic] = useState(findTopicId?.image);
  const [loading, setLoading] = useState(false)

  const [imgTopicView, setImgTopicView] = useState<any>(findTopicId?.image);

  const handlePopupPostTopic = () => {
    isToggle(!idBeginer)
  }

  const handelImgTopic = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return
    const filesImg: any = e.target.files[0];
    setImgTopic(filesImg)
    filesImg.preview = URL.createObjectURL(filesImg)
    setImgTopicView(filesImg)
  }
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imgTopicView?.preview)
    }
  }, [imgTopicView])

  const handleTopic = async (e: FormEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    if (!nameTopic || !targetTopic || !leverTopic || !imgTopic) return showToastErrEmpty()
    setLoading(true)
    const imgForm = new FormData()
    imgForm.append("file", imgTopic!)
    imgForm.append("upload_preset", "dinoEnglish");
    const response = await axiosPrivate.post(
      "https://api.cloudinary.com/v1_1/dlb1ac5xw/image/upload",
      imgForm
    )
    const newTopic = {
      id: id,
      name: nameTopic,
      target: targetTopic,
      lever: leverTopic,
      image: response.data.secure_url
    }
    try {
      const response = await axiosPrivate.put('/topic/puttopic', newTopic)
      handleReset()
      showToastsuccess()
      setLoading(false)
      window.location.reload()
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  const handleReset = () => {
    const resetImg = URL.revokeObjectURL(imgTopicView?.preview)
    setNameTopic("")
    setTopicTarget("")
    setLeverTopic("")
    setImgTopicView(resetImg)
  }
  const showToastsuccess = () => {
    toast.success('Tải thành công', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const showToastErrEmpty = () => {
    toast.warning(' Vui lòng nhập đầy đủ thông tin!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <div className='popup-topic  z-10 '>
      <form action="" className="form-container-topic bg-white p-5 w-[50%]" encType="multipart/form-data" onSubmit={(e) => handleTopic(e, findTopicId?.id!)}>
        <ToastContainer className="text-xs font-medium" />
        <div className="wp-form-left">
          <div className="wp-input">
            <label htmlFor="firstname" className='form-label flex gap-2'> Tên chủ đề:<WiStars color="red" /> </label>
            <input type="text" id='firstname' name='firstname' placeholder='' className="form-input" value={nameTopic} onChange={(e) => setNameTopic(e.target.value)} />
          </div>
          <div className="wp-input">
            <label htmlFor="lastname" className='form-label flex gap-2'>Mục đích:<WiStars color="red" /> </label>
            <input type="text" id='lastname' name='lastname' placeholder='' className="form-input" value={targetTopic} onChange={(e) => setTopicTarget(e.target.value)} />
          </div>
          <div className="wp-input ">
            <label htmlFor="lever" className='form-label-select'>Lever:<br />
              <select name='lever' id='lever' defaultValue={`${leverTopic}`} className='form-select' onChange={(e) => setLeverTopic(e.target.value)} >
                <option>--Chon cấp độ--</option>
                <option value="Sơ cấp">Sơ cấp</option>
                <option value="Trung cấp">Trung cấp</option>
                <option value="Cao cấp">Cao cấp</option>
              </select>
            </label>
          </div>
          <div className="mt-7 flex gap-5 justify-center">
            {loading ?
              <div className=' btn-save'><div className='ring-loading'></div></div>
              :
              <button type='submit' className=' btn-save'>Lưu</button>
            }
            <button type='reset' className=' btn-Cancel' onClick={handleReset} >Cancel</button>
          </div>
        </div>
        <div className="wp-right">
          <div className="wp-avatar overflow-hidden">
            {
              imgTopicView?.preview ?
                <img src={imgTopicView.preview} alt="" className='mx-auto' /> :
                <img src={imgTopic} alt="" className='mx-auto ' />
            }
          </div>
          <label htmlFor="avatar" className='label-avatar ' >
            <span>Hình ảnh topic</span>
            <input type="file" id='avatar' name='avatar' placeholder='avatar' onChange={handelImgTopic} />
          </label>
        </div>
        <div className="" onClick={handlePopupPostTopic} ><AiOutlineCloseCircle style={{ fontSize: "1.5rem" }} className="text-blue-500 hover:text-blue-700" /></div>
      </form>
    </div>
  )
}

export default EditTopic