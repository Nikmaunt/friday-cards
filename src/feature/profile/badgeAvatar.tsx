import React, { ChangeEvent, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import smallPhotoIcon from "./img/smallPhotoIcon.png";
import userPhoto from "./img/userPhoto.png";
import { IconButton } from "@mui/material";
import s from "./Profile.module.css";
import defaultAvatar from "./img/defaultAvatar.png";
import { useAppDispatch } from "../../app/store";
import { updateUserAvatar } from "../loginRegistration/authReducer";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 96,
  height: 96,
}));

const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const file64 = reader.result as string;
    callBack(file64);
  };
  reader.readAsDataURL(file);
};

export const BadgeAvatar = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState(props.userAvatar);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);

  // useEffect(() => {
  //   console.log("avatar changed");
  // }, [setAva]);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAvatar(file64);
          // setAvatar("111");
          console.log("file64: ", file64);
          dispatch(updateUserAvatar(file64));
        });
        console.log("add request");
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
      console.log("file: ", file);
      console.log("file.size: ", file.size);
      console.log("file.type: ", file.type);
    }
  };

  const errorHandler = () => {
    setIsAvatarBroken(true);
    alert("img is broken");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <label>
            <input type="file" onChange={uploadHandler} className={s.invisibleInput} />
            <IconButton component="span" className={s.uploadFile}>
              <img src={smallPhotoIcon} alt="uploadFile" className={s.uploadImg} />
            </IconButton>
          </label>
        }
      >
        <StyledAvatar
          src={isAvatarBroken ? defaultAvatar : avatar}
          className={s.profileAvatar}
          alt={"ava"}
          onError={errorHandler}
        />
      </Badge>
    </Stack>
  );
};

type PropsType = {
  userAvatar: string;
};
