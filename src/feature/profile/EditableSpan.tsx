import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
    KeyboardEvent,
} from "react";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../app/store";
import {updateUser} from "./profileReducer";



type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;


type SuperEditableSpanType = Omit<DefaultInputPropsType, "type"> & {

    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanProps?: DefaultSpanPropsType & { defaultText?: string }; // пропсы для спана
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
                                                                autoFocus,
                                                                onBlur,
                                                                onEnter,
                                                                spanProps,
                                                                ...restProps
                                                            }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {children, onDoubleClick, className, defaultText, ...restSpanProps} = spanProps || {};
    const dispatch = useAppDispatch()
    let [errors, setErrors] = useState<string>('')
    const onButtonClickHandler =  () => {
        if (restProps.value  !== '' ) {
            dispatch(updateUser(restProps.value as string))
            setEditMode(!editMode)
        } else {
            setErrors('Name is required!');
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && restProps.value  !== '' ) {
            dispatch(updateUser(restProps.value as string))
            setEditMode(!editMode)
        }
        else {
            setErrors('Name is required!');
        }
    }

    const onBlurHandler = () => {
        if (restProps.value  !== '' )
         setEditMode(!editMode);
        else {
            setErrors('Name is required!');
        }
    };

    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(!editMode);
        onDoubleClick?.(e);

    };



    return (
        <>
            {editMode ? (
                <TextField
                    variant="standard"
                    style={{width: 347}}
                    label="Nickname"
                    error={restProps.value === '' }
                    helperText={restProps.value === ''  ? errors : ' '}
                    onKeyPress={onKeyPressHandler}
                    onChange={spanProps?.onChange}
                    {...restProps}
                    InputProps={{
                        onBlur:onBlurHandler,
                        endAdornment:
                            <Button
                                onClick={onButtonClickHandler}
                                size="small" style={{marginBottom: '3px'}} variant="contained" disableElevation>
                                SAVE
                            </Button>
                    }}
                />

            ) : (
                <div>
                    <span onDoubleClick={onDoubleClickCallBack}  {...restSpanProps}>
                        {children || restProps.value || defaultText}
                        <BorderColorOutlinedIcon fontSize={"small"}/>
          </span>
                </div>
            )}
        </>
    );
};

export default SuperEditableSpan;



