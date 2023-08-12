import React, { useEffect, useState } from 'react'
import "../Learn.scss"
import { useParams } from 'react-router-dom'
import { axiosPrivate, axiosPublic } from '../../../../../config/ConfigApi'
import { TopicData } from '../../../../../type/Topic'
import { useAppSelector } from '../../../../../Store/Store'
import { getLogin } from '../../../../../Reducer/Slice/UserSlice'
type propData = {
    dataStatusTopic: TopicData[]
}
type dataQuestion = {
    answer: string;
    id: number;
    name: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    point: number;
    question: string;
    status: number;
    topicId: number;
}
const RightLearn: React.FC<propData> = ({ dataStatusTopic }) => {
    const [currenQuestion, setCurrenQuestion] = useState(0)
    const [select, setSelect] = useState("")
    const [tonggle, setTonggle] = useState(0)
    const [className, setClassName] = useState("")
    const [questions, setquestion] = useState<dataQuestion[]>([])

    //lấy user login
    const currenUser = useAppSelector(getLogin)
    const idUser = currenUser.id
    const { id } = useParams()

    // tìm StatusTopic theo tên
    const statusTopic = dataStatusTopic.find((topic) => topic.name === id)
    // tìm dataStatusTopic theo theo lever
    const arrLeverTopic = dataStatusTopic.filter((topic) => topic.lever === statusTopic?.lever)
    // lấy data câu hỏi theo tên chủ đề
    const getQuestion = async () => {
        try {
            const response = await axiosPrivate.get(`/question/getnamequestion/${id}`)
            setquestion(response.data)
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(() => {
        getQuestion()
    }, [id])

    // điều kiện trả lời
    const ckeckEnd = currenQuestion === questions.length - 1
    const handleAnswer = (select: string) => {
        const checkAnswer = select === questions[currenQuestion]?.answer
        setSelect(select)
        if (ckeckEnd && checkAnswer) {
            setClassName("isTrue");
            setTonggle(2)
        } else if (checkAnswer) {
            setClassName("isTrue");
            setTonggle(1)
        } else if (ckeckEnd) {
            setClassName("isFalse")
            setTonggle(3)
        } else if (ckeckEnd || !checkAnswer) {
            setClassName("isFalse")
            setTonggle(0)
        }
    }

    // chuyển câu hỏi
    const handleNext = () => {
        setCurrenQuestion(currenQuestion + 1)
        setClassName("")
        setTonggle(0)
    }

    // update data status nếu user vượt quá các câu hỏi trong phần topic
    const lastLeverTopic = arrLeverTopic[arrLeverTopic.length - 1]?.name === id
    const idStatus = statusTopic?.id
    const idTopic = statusTopic?.topicId
    // hàm tính tổng điểm 
    const addPoin = async (idStatus: number, idTopic: number) => {
        const updateStatus = { idStatus, idTopic }
        await axiosPublic.put('/status/topic/', updateStatus)
    }

    // hàm next topic
    const currenLever = statusTopic?.lever
    const nextTopic = async (idUser: string, currenLever: string) => {
        const statusUpdate = {
            idUser, currenLever
        }
        console.log("first")
        await axiosPublic.put("/status/nexttopic", statusUpdate)

    }
    useEffect(() => {
        if (tonggle === 2 && ckeckEnd) {
            addPoin(idStatus!, idTopic!)
        }
        if (tonggle === 2 && lastLeverTopic) {
            nextTopic(idUser, currenLever!)
        }
    }, [tonggle, id])


    // clearn 
    useEffect(() => {
        const clearnCode = () => {
            setClassName("")
            setTonggle(0)
            setCurrenQuestion(0)
        }

        return clearnCode()
    }, [id, dataStatusTopic])


    //  điều kiện button 
    let buttonElement;
    if (tonggle === 1) {
        buttonElement = <button className="isTrue item-btn" onClick={handleNext}>Tiếp theo</button>;
    } else if (tonggle === 2) {
        buttonElement = <div className="complete item-btn" >Chúc mừng bạn hoàn thành chủ để </div>;
    } else if (tonggle === 0) {
        buttonElement = <button disabled className=" item-btn">Tiếp theo</button>;
    } else if (tonggle === 3) {
        buttonElement = <button disabled className=" item-btn">Cố lên câu hỏi cuối rồi bạn</button>;
    }

    return (
        <div className=' wp-left-learn' >
            <div className="wp-head">
                <div className="head-topic">{questions[currenQuestion]?.name}</div>
                <p className='head-count'>{currenQuestion + 1}/{questions.length}</p>
            </div>
            <div className="wp-body">
                <div className="body-question">
                    <p>{questions[currenQuestion]?.question}</p>
                </div>
                <div className="wp-answer">
                    <button onClick={() => handleAnswer("A")} className={`answer ${select === "A" ? className : ""} `}>
                        <div className="circle">A</div>
                        <span>{questions[currenQuestion]?.option_a}</span>
                    </button>
                    <button onClick={() => handleAnswer("B")} className={`answer ${select === "B" ? className : ""} `}>
                        <div className="circle">B</div>
                        <span>{questions[currenQuestion]?.option_b}</span>
                    </button>
                    <button onClick={() => handleAnswer("C")} className={`answer ${select === "C" ? className : ""} `}>
                        <div className="circle">C</div>
                        <span>{questions[currenQuestion]?.option_c}</span>
                    </button>
                    <button onClick={() => handleAnswer("D")} className={`answer ${select === "D" ? className : ""} `}>
                        <div className="circle">D</div>
                        <span>{questions[currenQuestion]?.option_d}</span>
                    </button>
                </div>
            </div>
            <div className={`wp-btn `}  >
                {buttonElement}
            </div>
        </div >
    )
}

export default RightLearn