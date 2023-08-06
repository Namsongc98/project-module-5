import { Topic } from "src/module/topic/entity/topic"
import { Question } from "../entity/question"

type TypeTopicQuestion = {
    topic: Topic,
    question: Question[],
    count:number
}
type TypeQuestion ={
    idQuestion?:string
    question:string,
    optionA:string,
    optionB:string,
    optionC:string,
    optionD:string,
    answer:string,
    point?:number,
    idTopic?:number
}
export {TypeTopicQuestion,TypeQuestion}