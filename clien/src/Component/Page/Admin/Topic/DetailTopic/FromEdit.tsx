import React, { FormEvent, useEffect, useState, Dispatch } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { axiosPrivate } from '../../../../../config/ConfigApi'
import { useSelector } from 'react-redux'
import { getDataQuestion } from '../../../../../Reducer/Slice/Question'
import { IQuestion } from '../../../../../type/Topic'

interface IPropPopup {
    isToggle: Dispatch<React.SetStateAction<any>>
    idBeginer: IQuestion,
}
const FromEdit: React.FC<IPropPopup> = ({ isToggle, idBeginer }) => {

    const [question, setQuestion] = useState(idBeginer?.question)
    const [optionA, setOptionA] = useState(idBeginer?.option_a)
    const [optionB, setOptionB] = useState(idBeginer?.option_b)
    const [optionC, setOptionC] = useState(idBeginer?.option_c)
    const [optionD, setOptionD] = useState(idBeginer?.option_d)
    const [answer, setAnswer] = useState(idBeginer?.answer)

    const handlePopupPostTopic = () => {
        isToggle(!idBeginer)
    }
    const handleQuestion = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        const idQuestion = idBeginer?.id
        if (!question || !optionA || !optionB || !optionC || !optionD || !answer)
            return showToastErrEmpty()
        const updateQuestion = {
            idQuestion, question, optionA, optionB, optionC, optionD, answer
        }
        try {
            const response = await axiosPrivate.put("/question/updatequestion", updateQuestion)
            showToastsuccess()
            handleReset()
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
    const handleReset = () => {
        setQuestion("")
        setOptionA("")
        setOptionB("")
        setOptionC("")
        setOptionD("")
        setAnswer("")
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
        <div className='popup-topic z-10'>
            <form action="" className="form-container-topic bg-white p-5 w-[50%] " onSubmit={handleQuestion} >
                <ToastContainer className="text-xs font-medium" />
                <div className="wp-form-left">
                    <div className="wp-input">
                        <label htmlFor="question" className='form-label flex gap-2'> Câu hỏi:</label>
                        <input type="text" id='question' name='question' placeholder='' value={question} onChange={(e) => setQuestion(e.target.value)} className="form-input" />
                    </div>
                    <div className="wp-input">
                        <label htmlFor="optionA" className='form-label flex gap-2'>Câu A:</label>
                        <input type="text" id='optionA' name='optionA' placeholder='' value={optionA} onChange={(e) => setOptionA(e.target.value)} className="form-input" />
                    </div>

                    <div className="wp-input">
                        <label htmlFor="optionB" className='form-label flex gap-2'>Câu B:</label>
                        <input type="text" id='optionB' name='optionB' placeholder='' value={optionB} onChange={(e) => setOptionB(e.target.value)} className="form-input" />
                    </div>

                    <div className="mt-7">
                        <button type='submit' className=' btn-save' >Lưu</button>
                    </div>
                </div>
                <div className="wp-form-left">

                    <div className="wp-input">
                        <label htmlFor="optionC" className='form-label flex gap-2'> Câu C:</label>
                        <input type="text" id='optionC' name='optionC' placeholder='' value={optionC} onChange={(e) => setOptionC(e.target.value)} className="form-input" />
                    </div>
                    <div className="wp-input">
                        <label htmlFor="optionD" className='form-label flex gap-2'>Câu D: </label>
                        <input type="text" id='optionD' name='optionD' placeholder='' value={optionD} onChange={(e) => setOptionD(e.target.value)} className="form-input" />
                    </div>
                    <div className="wp-input ">
                        <label htmlFor="lever" className='form-label-select'>Câu trả lời đúng là:<br />
                            <select name='lever' id='lever' className='form-select' defaultValue={idBeginer?.answer} onChange={(e) => setAnswer(e.target.value)} >
                                <option>--Câu trả lời đúng--</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </label>
                    </div>
                    <div className="mt-7">
                        <button type='reset' className=' btn-Cancel' onClick={handleReset}>Cancel</button>
                    </div>
                </div>
                <div className="" onClick={handlePopupPostTopic}  ><AiOutlineCloseCircle style={{ fontSize: "1.5rem" }} className="text-blue-500 hover:text-blue-700" /></div>
            </form>
        </div>
    )
}

export default FromEdit