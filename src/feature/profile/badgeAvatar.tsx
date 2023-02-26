import React, { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import smallPhotoIcon from "./img/smallPhotoIcon.png";
import userPhoto from "./img/userPhoto.png";
import { IconButton } from "@mui/material";
import s from "./Profile.module.css";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 96,
  height: 96,
}));

const changeAvatar = () => {};

const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0];
    console.log("file: ", file);
  }
};

export const BadgeAvatar = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <label>
            <input type="file" onChange={uploadHandler} className={s.invisibleInput} />
            <IconButton component="span" className={s.uploadFile}>
              {<img src={smallPhotoIcon} alt="uploadFile" className={s.uploadImg} />}
            </IconButton>
          </label>
        }
      >
        <StyledAvatar src={userPhoto} alt="Travis Howard" />
      </Badge>
    </Stack>
  );
};
