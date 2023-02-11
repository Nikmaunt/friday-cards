import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import s from "./SearchField.module.css";
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
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Search</h2>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Provide your text" inputProps={{ "aria-label": "search" }} />
      </Search>
    </div>
  );
};
