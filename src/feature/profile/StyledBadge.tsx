import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import smallPhotoIcon from "./img/smallPhotoIcon.png";
import userPhoto from "./img/userPhoto.png";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 96,
  height: 96,
}));

export default function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<img src={smallPhotoIcon} style={{ width: 32, height: 32 }} alt="" />}
      >
        <StyledAvatar src={userPhoto} alt="Travis Howard" />
      </Badge>
    </Stack>
  );
}
