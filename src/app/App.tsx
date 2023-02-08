import React from 'react'
import './App.css'
import { Header } from '../common/header/header'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../feature/login/login'
import { Registration } from '../feature/registration/registration'
import { Profile } from '../feature/profile/profile'
import { NotFoundPage } from '../feature/notFoundPage/notFoundPage'
import { PasswordRecovery } from '../feature/passwordRecovery/passwordRecovery'
import { NewPassword } from '../feature/newPassword/newPassword'
import { TestComponents } from '../feature/testComponents/testComponents'
import { ForgotPassword } from '../feature/passwordRecovery/ForgotPassword'
import { CheckEmail } from '../feature/passwordRecovery/CheckEmail'
import { CreatePassword } from '../feature/passwordRecovery/CreatePassword'
import { LoginRegistration } from '../common/loginRegistration/loginRegistration'

const App = () => {
  return (
    <div className='App'>
      <>
        <Header />
        <div>
          <Routes>
            <Route path={'/friday-cards/login'} element={<LoginRegistration />}></Route>
            <Route path={'/friday-cards/registration'} element={<LoginRegistration />}></Route>
            <Route path={'/friday-cards/profile'} element={<Profile />}></Route>
            <Route path={'/friday-cards/404'} element={<NotFoundPage />}></Route>
            {/*<Route path={"/friday-cards/password-recovery"} element={<PasswordRecovery />}></Route>*/}
            <Route path={'/friday-cards/password-recovery'} element={<ForgotPassword />}></Route>
            {/*<Route path={"/friday-cards/new-password"} element={<NewPassword />}></Route>*/}
            <Route path={'/friday-cards/new-password'} element={<CreatePassword />}></Route>
            <Route path={'/friday-cards/test-components'} element={<TestComponents />}></Route>
            <Route path={'/friday-cards/check-email'} element={<CheckEmail />}></Route>
            <Route path={'/friday-cards'} element={<LoginRegistration />}></Route>
            <Route path={'*'} element={<NotFoundPage />}></Route>
          </Routes>
          {/*<ForgotPassword />*/}
          {/*<CheckEmail />*/}
          {/*<CreatePassword />*/}
        </div>
      </>
    </div>
  )
}

export default App
