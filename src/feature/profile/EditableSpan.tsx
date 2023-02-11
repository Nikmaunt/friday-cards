import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { updateUser } from "../loginRegistration/authReducer";

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
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {};
  const dispatch = useAppDispatch();
  const userName = useAppSelector<string>((state) => state.auth.user.name);

  let [name, setName] = useState<string>(userName);
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onButtonClickHandler = () => {
    console.log("but work save");
    dispatch(updateUser(name));
    //
    setEditMode(!editMode);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(updateUser(name));
      setEditMode(!editMode);
    }
  };

  const onBlurHandler = () => {
    setEditMode(false);
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
          style={{ width: 347 }}
          label="Nickname"
          onKeyPress={onKeyPressHandler}
          onChange={changeName}
          value={name}
          //onBlur={onBlurHandler} /// если включить перестает работать onClick у button
          InputProps={{
            endAdornment: (
              <Button
                onClick={onButtonClickHandler}
                size="small"
                style={{ marginBottom: "3px" }}
                variant="contained"
                //disableElevation
              >
                SAVE
              </Button>
            ),
          }}
        />
      ) : (
        <div>
          <span onDoubleClick={onDoubleClickCallBack} {...restSpanProps}>
            {children || restProps.value || defaultText}
            <BorderColorOutlinedIcon fontSize={"small"} />
          </span>
        </div>
      )}
    </>
  );
};

export default SuperEditableSpan;
