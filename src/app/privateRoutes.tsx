import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectorLogin} from "../feature/loginRegistration/selectors";

export const PrivateRoutes = () => {
    const isLogin = useSelector(selectorLogin);
    return (
        isLogin ? <Outlet/> : <Navigate to='/login'/>
    )
}