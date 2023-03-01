import React, {useEffect} from "react";
import {Header} from "../common/header/header";
import {ErrorSnackbar} from "../common/errorSnackbar/errorSnackbar";
import {authMe} from "../feature/loginRegistration/authReducer";
import {useAppDispatch} from "./store";
import {Pages} from "./routes";
import {useSelector} from "react-redux";
import {selectAppStatus} from "./appSelectors";
import LinearProgress from "@mui/material/LinearProgress";

const App = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectAppStatus);

    useEffect(() => {
        dispatch(authMe());
    }, []);

    return (
        <>
            <Header/>
            {loading === 'loading' && <LinearProgress/>}
            <Pages/>
            <ErrorSnackbar/>
        </>
    );
};

export default App;
