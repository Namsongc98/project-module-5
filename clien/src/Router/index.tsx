import React, { ReactNode } from 'react'

import Login from "../Component/Page/Form/Login/Login";
import Register from "../Component/Page/Form/Register/Register";
import Home from "../Component/Page/Home/Home";
import Topic from "../Component/Page/Topic/Topic";


//admin
import ManagerUser from "../Component/Page/Admin/user/User";
import ProfileUser from '../Component/Page/Profile/ProfileUser';
import CheckUser from '../Component/Page/CheckUser/CheckUser';
import TopicAmin from "../Component/Page/Admin/Topic/AdminTopic"
import DetailTopic from '../Component/Page/Admin/Topic/DetailTopic/DetailTopic';
import Question from '../Component/Page/Admin/Question/Question';
import DetailUser from "../Component/Page/Admin/user/detailUser/DetailUser";

type PublicType = {
    path: string;
    component: React.FC | (() => JSX.Element | ReactNode);
    layout: boolean

}[]
type PrivateType = {
    path: string;
    component: React.FC | (() => JSX.Element | ReactNode);
    layout: boolean;
}[]
//user
const Public: PublicType = [
    { path: "/", component: Home, layout: true },
    { path: "/login", component: Login, layout: true },
    { path: "/register", component: Register, layout: true },
    { path: "/topic", component: Topic, layout: true },
    { path: "/profile", component: ProfileUser, layout: true },
    { path: "/checkuser", component: CheckUser, layout: true }
]

//admin
const Private: PrivateType = [
    { path: "/manageruser", component: ManagerUser, layout: true },
    { path: "/managertopic", component: TopicAmin, layout: true },
    { path: "/detailtopic/:id", component: DetailTopic, layout: true },
    { path: "/managerquestion", component: Question, layout: true },
    { path: "/detailuser/:id", component: DetailUser, layout: true }
]
export { Private, Public }



