import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                <NavLink to="/friday-cards/login">Login</NavLink>
                <NavLink to="/friday-cards/registration">Registration</NavLink>
                <NavLink to="/friday-cards/profile">Profile</NavLink>
                <NavLink to="/friday-cards/404">Page Not Found</NavLink>
                <NavLink to="/friday-cards/password-recovery">Password Recovery</NavLink>
                <NavLink to="/friday-cards/new-password">New Password</NavLink>
                <NavLink to="/friday-cards/test-components">Test Components</NavLink>
            </div>
        </div>
    )
}