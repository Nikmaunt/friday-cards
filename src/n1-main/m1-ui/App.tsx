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
                        <Route path={'/friday-cards/login'} element={<Login/>}></Route>
                        <Route path={'/friday-cards/registration'} element={<Registration/>}></Route>
                        <Route path={'/friday-cards/profile'} element={<Profile/>}></Route>
                        <Route path={'/friday-cards/404'} element={<NotFoundPage/>}></Route>
                        <Route path={'/friday-cards/password-recovery'} element={<PasswordRecovery/>}></Route>
                        <Route path={'/friday-cards/new-password'} element={<NewPassword/>}></Route>
                        <Route path={'/friday-cards/test-components'} element={<TestComponents/>}></Route>
                        <Route path={'/friday-cards'} element={<Registration/>}></Route>
                        <Route path={'*'} element={<NotFoundPage/>}></Route>
                    </Routes>
                </div>
            </>
        </div>
    );
}

export default App;
