import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.wrapper}>
            <NavLink to={'/login'}/>Login
            <div className={s.list}>

                <NavLink to={'/registration'}/>Registration
                <NavLink to={'/profile'}/>Profile
                <NavLink to={'/404'}/>404
                <NavLink to={'/password-recovery'}/>Password Recovery
                <NavLink to={'/new-password'}/>New password
                <NavLink to={'/test'}/>Test Common Components
            </div>
        </div>
    )
}