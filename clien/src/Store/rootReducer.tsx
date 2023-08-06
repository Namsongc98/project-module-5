import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from '../Reducer/Slice/UserSlice';
import Evaluate from '../Reducer/Slice/Evaluate';
import Topic from "../Reducer/Slice/UseTopic";
import Question from "../Reducer/Slice/Question"
import Profile from '../Reducer/Slice/Profile';


const rootReducer = combineReducers({
    UserSlice:UserSlice,
    Evaluate:Evaluate,
    Topic:Topic,
    Question:Question,
    Profile:Profile
});

export default rootReducer;