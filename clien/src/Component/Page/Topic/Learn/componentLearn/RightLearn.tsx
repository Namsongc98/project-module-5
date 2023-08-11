import React, { useEffect, useState } from 'react'
import "../Learn.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { axiosPrivate } from '../../../../../config/ConfigApi'
import { TopicData } from '../../../../../type/Topic'
type propData = {
    dataTopic: TopicData[]
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
const RightLearn: React.FC<propData> = () => {
    const [currenQuestion, setCurrenQuestion] = useState(0)
    const [select, setSelect] = useState("")
    const [tonggle, setTonggle] = useState(0)
    const [className, setClassName] = useState("")
    // const [selectD, setSelectD] = useState("")
    const [questions, setquestion] = useState<dataQuestion[]>([])
    const { id } = useParams()

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

    const handleAnswer = (select: string) => {
        setSelect(select)
        const checkAnswer = select === questions[currenQuestion].answer
        const ckeckEnd = currenQuestion === questions.length - 1
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

    const handleNext = () => {
        setCurrenQuestion(currenQuestion + 1)
        setClassName("")
        setTonggle(0)
    }

    useEffect(() => {
        
        return () => {
            setClassName("")
            setTonggle(0)
            setCurrenQuestion(0)
        }
    }, [id])

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
                {buttonElement
                    // tonggle === 1 ?
                    //     <button className="isTrue" onClick={handleNext}>Tiếp theo</button> :
                    //     tonggle === 2 ?
                    //         <button className="isTrue" onClick={handleNextTopic}>Qua chủ đề mới</button> :
                    //         tonggle === 0 ?

                    //             <button disabled className="">Tiếp theo</button> :

                    //             <button disabled className="">Qua chủ đề mới</button>
                }
            </div>
        </div >
    )
}

export default RightLearn