import { useAppSelector } from "../../app/store";
import { userId } from "../../feature/packs/selectors";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

type ActionsIconPackType = {
  user_id: string;
};

export const ActionsIconPack = (props: ActionsIconPackType) => {
  const userAuthId = useAppSelector(userId);
  return (
    <div>
      <SchoolOutlinedIcon />
      {props.user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}
      {props.user_id === userAuthId ? <DeleteOutlinedIcon /> : null}
    </div>
  );
};
