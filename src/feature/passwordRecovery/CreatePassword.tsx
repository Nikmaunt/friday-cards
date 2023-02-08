import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import './createPassword.css'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { changePasswordTC, recoveryPasswordTC } from '../../state/forgotPassword-reducer'
import { useDispatch } from 'react-redux'
import { AppThunkType } from './ForgotPassword'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { Navigate } from 'react-router-dom'

export const CreatePassword = () => {
  let dispatch = useAppDispatch()
  const isLogin = useAppSelector<boolean>((state) => state.recoveryPassword.isLogin)

  const [password, setPassword] = useState('')
  const [error, setError] = useState<null | string>('')

  //отображение пароля при вводе в Input
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  //ввод пароля
  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  //нажатие на кнопку для отправки нового пароля на сервер
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === 'Enter') {
      sendNewPassword()
    }
  }

  //отправка нового пароля на сервер
  const sendNewPassword = () => {
    if (password.length < 8) {
      setError('Password length should be more then 8 symbols')
    } else {
      dispatch(changePasswordTC(password))
    }
  }

  if (isLogin) {
    return <Navigate to={'/friday-cards/login'} />
  }

  return (
    <div className={'createPasswordBlock'}>
      <div className={'createPassword'}>
        <div className={'title'}>Create new password</div>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant='standard' className={'textField'}>
            <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
            <Input
              id='standard-adornment-password'
              type={showPassword ? 'text' : 'password'}
              onChange={onChangePasswordHandler}
              onKeyDown={onKeyDownHandler}
              error={!!error}
              value={password}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className={'description'}>Create new password and we will send you further instructions to email</div>
        <Button className={'button'} variant={'contained'} onClick={sendNewPassword}>
          Create new password
        </Button>
      </div>
    </div>
  )
}
