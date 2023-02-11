import React from "react";
import EnhancedTable from "./EnhancedTable";

type PacksListPropsType = {
  PageTitle: string;
};

export const PacksList = (props: PacksListPropsType) => {
  return (
    <div>
      <div>{props.PageTitle}</div>
      <EnhancedTable />
    </div>
  );
};
