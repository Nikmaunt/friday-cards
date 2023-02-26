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

export const BadgeAvatar = () => {
  const [ava, setAva] = useState(defaultAvatar);

  useEffect(() => {
    console.log("avatar changed");
  }, [setAva]);
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64);
          console.log("file64: ", file64);
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
        {/*<StyledAvatar src={userPhoto} alt={defaultAvatar} />*/}
        <StyledAvatar src={ava || defaultAvatar} alt={ava} />
      </Badge>
    </Stack>
  );
};
