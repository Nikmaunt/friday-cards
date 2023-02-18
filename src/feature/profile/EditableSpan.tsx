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
import { useAppDispatch } from "../../app/store";
import { updateUser } from "../loginRegistration/authReducer";
import { useSelector } from "react-redux";
import { selectUserName } from "./selectors";

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
  const userName = useSelector(selectUserName);

  let [name, setName] = useState<string>(userName);
  let [errors, setErrors] = useState<string>("");

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onButtonClickHandler = () => {
    console.log("click save");
    if (name !== "") {
      console.log("click save in if");
      dispatch(updateUser(name));
      setEditMode(!editMode);
    } else {
      setErrors("Name is required!");
    }
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name !== "") {
      dispatch(updateUser(name));
      setEditMode(!editMode);
    } else {
      setErrors("Name is required!");
    }
  };
  const onBlurHandler = () => {
    if (name !== "") setEditMode(!editMode);
    else {
      setErrors("Name is required!");
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
          style={{ width: 347 }}
          label="Nickname"
          onKeyPress={onKeyPressHandler}
          error={name === ""}
          helperText={name === "" ? errors : null}
          onChange={changeName}
          value={name}
          onBlur={onBlurHandler}
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
            {children || restProps.value || "Please enter your name"}
            <BorderColorOutlinedIcon
              sx={{ cursor: "pointer", fontSize: "small" }}
              onClick={() => {
                setEditMode(!editMode);
              }}
            />
          </span>
        </div>
      )}
    </>
  );
};

export default SuperEditableSpan;
