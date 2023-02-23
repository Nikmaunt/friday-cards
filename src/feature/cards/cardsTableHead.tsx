import React, { useState } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { headCellsCards } from "../../common/constans/table";
import s from "./Cards.module.css";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { DataCards } from "./cardsTable";

export const CardsTableHead = () => {
  const [orderBy, setOrderBy] = useState<keyof DataCards>("question");

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DataCards) => {
    setOrderBy(property);
  };
  const createSortHandler = (property: keyof DataCards) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none"></TableCell>
        {headCellsCards.map((headCell) => (
          <TableCell key={headCell.id} className={s.headCell} sx={{ paddingRight: "36px", textAlign: "left" }}>
            <TableSortLabel active={orderBy === headCell.id} onClick={createSortHandler(headCell.id)}>
              <span className={s.headCell}>{headCell.label}</span>
              {orderBy === headCell.id ? <Box component="span" sx={visuallyHidden}></Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
