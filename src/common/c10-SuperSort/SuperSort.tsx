import React from "react";
import arrowUp from "../../up.svg";
import arrowDown from "../../down.svg";
import momeIcon from "../../twoArrows.svg";
// добавить в проект иконки и импортировать
const downIcon = arrowDown;
const upIcon = arrowUp;
const noneIcon = momeIcon;

export type SuperSortPropsType = {
  id?: string;
  sort: string;
  value: string;
  onChange: (newSort: string) => void;
};

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  return sort === down ? up : sort === up ? "" : down;
};

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = "hw15" }) => {
  console.log("sort", sort);
  const up = "0" + value;
  const down = "1" + value;

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up));
  };

  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon;

  return (
    <span id={id + "-sort-" + value} onClick={onChangeCallback}>
      <img id={id + "-icon-" + sort} src={icon} alt="icon" />
    </span>
  );
};

export default SuperSort;
