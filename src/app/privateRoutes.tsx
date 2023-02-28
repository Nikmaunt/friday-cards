import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectorAuth} from "./appSelectors";
import {SkeletonLoader} from "../common/skeletonLoader/skeletonLoader";

export const PrivateRoutes = () => {
    const isAuth = useSelector(selectorAuth);

    if (isAuth === false) {
        return <SkeletonLoader height={"60px"} count={5}/>;
    }
    return (
        isAuth  ? <Outlet/> : <Navigate to='/login'/>
    )
}