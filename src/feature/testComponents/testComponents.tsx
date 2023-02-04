import SuperSelect from "../../common/c5-SuperSelect/SuperSelect";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../../common/c7-SuperRange/SuperRange";
import SuperDebouncedInput from "../../common/c8-SuperDebouncedInput/SuperDebouncedInput";
import SuperPagination from "../../common/c9-SuperPagination/SuperPagination";
import SuperSort from "../../common/c10-SuperSort/SuperSort";
import s from "./TestComponents.module.css";

export const TestComponents = () => {
  return (
    <div className={s.wrapper}>
      <SuperSelect />

      <SuperInputText />
      <SuperCheckbox />
      <SuperEditableSpan />
      <SuperRadio />
      <SuperRange />
      <SuperDebouncedInput />
      {/*<SuperPagination page={1} itemsCountForPage={4} totalCount={5} onChange={}/>*/}
      {/*<SuperSort sort={} value={} onChange={}/>*/}
    </div>
  );
};
