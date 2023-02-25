import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { headCells } from "../../common/constans/table";
import s from "./Packs.module.css";
import TableSortLabel from "@mui/material/TableSortLabel";

import { DataRows } from "./packsTable";

import { useAppDispatch } from "../../app/store";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
export const PacksTableHead = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataRows>("cards");

  const onRequestSort = (event: React.MouseEvent<unknown>, property: keyof DataRows) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const createSortHandler = (property: keyof DataRows) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
    const params = { sortPacks: "1updated" };
    //dispatch(setPacksParams(params));
  };
  return (
    <TableHead className={s.headCell}>
      <TableRow>
        <TableCell padding="none"></TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="none"></TableCell>
//         {headCells.map((headCell) => (
//             <TableCell key={headCell.id} className={s.headCell} sx={{ paddingRight: "36px", textAlign: "left" }}>
//               <TableSortLabel active={orderBy === headCell.id} onClick={createSortHandler(headCell.id)}>
//                 <span className={s.headCell}>{headCell.label}</span>
//                 {orderBy === headCell.id ? <Box component="span" sx={visuallyHidden}></Box> : null}
//               </TableSortLabel>
//             </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
// );

//////types/////////
type Order = "asc" | "desc";
