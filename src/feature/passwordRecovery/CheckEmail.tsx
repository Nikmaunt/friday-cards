import React from 'react'
import './checkEmail.css'
import { Button } from '@mui/material'
import messageIcon from '../../img/MessageIcon.svg'
import { NavLink } from 'react-router-dom'

export const CheckEmail = () => {
  return (
    <div className={'checkEmailBlock'}>
      <div className={'checkEmail'}>
        <div className={'title'}>Check Email</div>
        <img src={messageIcon} alt='messageIcon not found' className={'messageIcon'} />
        <div className={'description'}>We’ve sent an Email with instructions to example@mail.com</div>
        <NavLink to='/friday-cards/login'>
          <Button className={'button'} variant={'contained'}>
            Back to login
          </Button>
        </NavLink>
      </div>
    </div>
  )
}
