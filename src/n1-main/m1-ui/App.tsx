import React from 'react';
import './App.css';
import {Header} from "./header/header";
import {Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <>
                <Header/>
                <div>
                    <Routes>
                        <Route path={'/login'} element={<div>LOGIN</div>}></Route>
                        <Route path={'/'} element={<div>LOGIN</div>}></Route>
                    </Routes>
                </div>
            </>
        </div>
    );
}

export default App;
