import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import s from "./SearchField.module.css";
import { ChangeEvent, useEffect, useState } from "react";

import { useAppDispatch } from "../../../app/store";
import { fetchPacksTC, setPacksParams } from "../../packs/packsReducer";
import { useSelector } from "react-redux";
import { selectorIsClearSearchField } from "../../packs/packsSelectors";

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
  console.log("searchField rerender");
  const isClearField = useSelector(selectorIsClearSearchField);

  function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 800);
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
    return debouncedValue;
  }

  const [searchText, setSearchText] = useState<string>("");
  if (isClearField) {
    setSearchText("");
  }
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce<string>(searchText, 800);

  useEffect(() => {
    const params = { packName: debouncedValue };
    dispatch(setPacksParams(params));
    dispatch(fetchPacksTC());
  }, [debouncedValue]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
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
