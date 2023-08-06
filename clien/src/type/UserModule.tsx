import { SerializedError } from "@reduxjs/toolkit"

interface NewUser {
  email: string,
  password: string
}

interface CurrenUser {
  id: string
  email: string
  password: string
  role: string | undefined
  point: number
}

interface IProfile {
  id: string
  firstName: string
  lastName: string
  age: string | null
  phone: string
  avatar: string
  gender: string
}

type IDataUser = {
  age?: string | null
  email: string
  firstName: string | null
  id: string
  point?: number
  avatar: string | undefined
  lastName: string | null
  phone?: string | null
  role: number
  date?: string | null
  evaluate?: string | null
  rating?: number | null
  status: number
}[]

interface RegisterUser {
  email: string,
  password: string,
}

interface UsersState {
  userLogin: any[] | void;
  error: SerializedError | undefined | null;
  loading: boolean;
}

interface IUseEvaluate {
  userEvaluate: any[] | void,
  error: SerializedError | undefined | null,
  loading: boolean
}

interface ITopicState {
  useTopic: any[] | void,
  useTopicBeginner: any[] | void,
  useTopicIntermediate: any[] | void,
  useTopicAdvanced: any[] | void,
  error: SerializedError | undefined | null,
  loading: boolean,
}

interface IEvaluate {
  id?: string | null,
  evaluate: string | null;
  rating: number | null;
  email: string | null,
  idUser: string | null,
  date: string,
}

type IEvaluateLimit = {
  date: string
  evaluate: string
  avatar: string
  lastName: string
  firstName: string
  rating: number
  id: string
}[]

export { NewUser, CurrenUser, RegisterUser, UsersState, IEvaluate, IUseEvaluate, IEvaluateLimit, IDataUser, ITopicState, IProfile }