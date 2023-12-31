type DataBeginner = {
  id: number | undefined;
  id_topic_user: string | null;
  image: string;
  lever_topic: string;
  name: string;
  status: boolean;
  target: string;
}[];

type TopicData = {
  id: number;
  image: string;
  lever: string;
  name: string;
  poiter: number;
  status_advanced: number | boolean;
  status_beginner: boolean;
  status_intermediate: number | boolean;
  target: string;
  topicId: number;
  userId: string;
}


interface IQuestion {
  answer: string
  id: number | undefined
  idTopic: number | null
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  question: string
  status: string | null
}

type IQuestionJoinTopic = {
  answer: string
  id: number
  image: string
  lever: string
  name: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  point: number
  question: string
  status: number
  target?: string
  topicId?: number
}
export { DataBeginner, IQuestion, IQuestionJoinTopic, TopicData }