import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import { selectorAuth} from "./appSelectors";


export const PrivateRoutes = () => {
    const isAuth = useSelector(selectorAuth);

    return (
        isAuth  ? <Outlet/> : <Navigate to='/login'/>
    )
}