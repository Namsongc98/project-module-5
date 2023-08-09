import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import { axiosPrivate } from '../../../../config/ConfigApi';
import { useDispatch } from 'react-redux';
import { setDataQuestion } from '../../../../Reducer/Slice/Question';
import { ToastContainer, toast } from 'react-toastify'
import ReactPaginate from "react-paginate";
import "./Question.scss"
import { AiFillDelete, AiFillQuestionCircle } from 'react-icons/ai';

type Question = {
    answer: string,
    id: number
    name: string
    option_a: string
    option_b: string
    option_c: string
    option_d: string
    question: string
}

const Question: React.FC = () => {
    const [dataQuesion, setDataQuesion] = useState<Array<Question>>([])
    const [searchTopic, setSearchTopic] = useState("")
    const [count, setcount] = useState<number>()
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const displayQuesion = dataQuesion?.slice(pagesVisited, pagesVisited + usersPerPage)
    const dispatch = useDispatch()

    //  get question 
    const getAllQuestion = async () => {
        try {
            const response = await axiosPrivate.get("/question");
            dispatch(setDataQuestion(response.data))
            setDataQuesion(response.data)
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
    useEffect(() => {
        getAllQuestion()
    }, [])


    // count 
    const countQuestion = async () => {
        try {
            const response = await axiosPrivate.get("/question/count")
            setcount(response.data)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        countQuestion()
    }, [dataQuesion])

    // delete question
    const handleDelete = async (idTopic: number) => {
        try {
            await axiosPrivate.delete(`/question/${idTopic}`);
            getAllQuestion()
            showToastsuccess();
        } catch (error) {
            throw new Error(error);
        }
    };
    const showToastsuccess = () => {
        toast.success("xóa thành công", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const pageCount = Math.ceil(dataQuesion.length / usersPerPage);
    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };


    // search 
    const handleSearch = async () => {
        if (!searchTopic.trim()) return
        try {
            const response = await axiosPrivate.get(`/topic/searchtopic/search?name=${encodeURIComponent(searchTopic)}`)
            setDataQuesion(response.data)
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(() => {
        if (!searchTopic) return
        handleSearch()
    }, [searchTopic])



    return (
        <main>
            <ToastContainer className="text-xs font-medium" />
            <div className='w-full'>
                <div className="flex justify-between items-center">
                    <h1 className=" font-semibold text-2xl m-0  text-[#299cd9]">Câu hỏi</h1>
                    <div className="wp-search">
                        <input type="text" placeholder='Nhập tên' className='input-search'
                            value={searchTopic}
                            onChange={(e: any) => setSearchTopic(e.target.value)} />
                        <BsSearch className="text-[17px] text-white" />
                    </div>
                </div>
                <div className="flex gap-4 mt-5">
                    <div className="rounded-lg w-1/4 h-24 flex p-4 gap-4 items-center shadow-md hover:shadow-xl bg-green-600" >
                        <div className=" text-white w-16 h-16 rounded-lg flex justify-center items-center">
                            <AiFillQuestionCircle className="text-7xl text-yellow-500" />
                        </div>
                        <div className=" flex flex-col text-lg ">
                            <p className='font-semibold text-white'>Số lượng câu hỏi </p>
                            <div className="flex gap-3 items-center justify-center">
                                <span className='font-semibold text-white text-2xl '>{count}</span>
                                <AiFillQuestionCircle className="text-xl text-yellow-500" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-5 w-full p-5 bg-white ">
                    <div className=" wp-table ">
                        <table className='w-full detail-table'>
                            <thead className='detail-thead'>
                                <tr className=' '>
                                    <th className='w-10'>
                                        .#
                                    </th>
                                    <th>
                                        Chủ đề
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
                                        Ative
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayQuesion?.map((question) => (
                                    <tr key={question.id}>
                                        <td>
                                            {question.id}
                                        </td>
                                        <td>
                                            {question.name}
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
                                        <td>
                                            <div className="text-red-400 hover:text-red-600">
                                                <AiFillDelete style={{ fontSize: "20px" }} onClick={() => handleDelete(question.id!)} />
                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </main>
    )
}

export default Question