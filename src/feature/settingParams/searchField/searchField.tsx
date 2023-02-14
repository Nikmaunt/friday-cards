import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import s from "./SearchField.module.css";
import { ChangeEvent, useState } from "react";
import { getPackTC } from "../settingsReducer";
import { useAppDispatch } from "../../../app/store";

const Search = styled("div")(({ theme }) => ({
  border: "solid 1px #DEDBDC",
  position: "relative",
  borderRadius: "5px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "413px",
    margin: "0px",
    backgroundColor: "#FFFFFF",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  paddingLeft: "16px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ADABAC",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing("12px", 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
  width: "100%",
}));

export const SearchField = () => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useAppDispatch();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    const params = { packName: e.currentTarget.value };
    dispatch(getPackTC(params));
  };
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Search</h2>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Provide your text"
          inputProps={{ "aria-label": "search" }}
          onChange={onChangeHandler}
        />
      </Search>
    </div>
  );
};
