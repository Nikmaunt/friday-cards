import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectorAuth} from "./appSelectors";
import {SkeletonLoader} from "../common/skeletonLoader/skeletonLoader";
import LinearProgress from "@mui/material/LinearProgress";

export const PrivateRoutes = () => {
    const isAuth = useSelector(selectorAuth);

    if (isAuth === false) {
        return <LinearProgress/>;
    }
    return (
        isAuth ? <Outlet/> : <Navigate to='/login'/>
    )
}