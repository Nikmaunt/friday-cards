import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectAppStatus, selectorAuth} from "./appSelectors";
import {SkeletonLoader} from "../common/skeletonLoader/skeletonLoader";
import LinearProgress from "@mui/material/LinearProgress";

export const PrivateRoutes = () => {
    const isAuth = useSelector(selectorAuth);

    return (
        isAuth  ? <Outlet/> : <Navigate to='/login'/>
    )
}