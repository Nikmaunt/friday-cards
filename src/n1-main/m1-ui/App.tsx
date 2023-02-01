import React from 'react';
import './App.css';
import {Header} from "./header/header";
import {Route, Routes} from "react-router-dom";
import {Login} from "./login/login";
import {Registration} from "./registration/registration";
import {Profile} from "./profile/profile";
import {NotFoundPage} from "./notFoundPage/notFoundPage";
import {PasswordRecovery} from "./passwordRecovery/passwordRecovery";
import {NewPassword} from "./newPassword/newPassword";
import {TestComponents} from "./testComponents/testComponents";

const App = () => {
    return (
        <div className="App">
            <>
                <Header/>
                <div>
                    <Routes>
                        <Route path={'/login'} element={<Login/>}></Route>
                        <Route path={'/registration'} element={<Registration/>}></Route>
                        <Route path={'/profile'} element={<Profile/>}></Route>
                        <Route path={'/404'} element={<NotFoundPage/>}></Route>
                        <Route path={'/password-recovery'} element={<PasswordRecovery/>}></Route>
                        <Route path={'/new-password'} element={<NewPassword/>}></Route>
                        <Route path={'/test-components'} element={<TestComponents/>}></Route>
                        <Route path={'/'} element={<Registration/>}></Route>
                        <Route path={'*'} element={<NotFoundPage/>}></Route>
                    </Routes>
                </div>
            </>
        </div>
    );
}

export default App;
