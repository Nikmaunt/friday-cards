import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/registration">Registration</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/404">Page Not Found</NavLink>
                <NavLink to="/password-recovery">Password Recovery</NavLink>
                <NavLink to="/new-password">New Password</NavLink>
                <NavLink to="/test-components">Test Components</NavLink>
            </div>
        </div>
    )
}