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
import { fetchPacksTC } from "./packsReducer";
import { log } from "util";

export const PacksTableHead = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("cards");
  const dispatch = useAppDispatch();

  const onRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    //0 от большего desk
    //1 от меньшего к большему ask
    if (orderBy === property) {
      let params;
      if (order === "asc") {
        console.log(order);
        // sortingDirection = 1;
        params = { sortPacks: `1${property}` };
        setOrder("desc");
        console.log("setOrder", order);
      } else {
        // isAsc = false;
        // sortingDirection = 0;
        // params = { sortPacks: `0${property}` };
        params = { sortPacks: `0${property}` };
        console.log("setOrder", order);
        setOrder("asc");
      }
      dispatch(fetchPacksTC(params));
    }
    setOrder(isAsc ? "desc" : "asc");
    console.log("orderBy", orderBy);
    console.log("property", property);
    console.log("order", order);
    console.log("isAsc logic", order, "=", property, "&&", order);
    // console.log("isAsc", isAsc);
    //ask по возрастанию
    setOrderBy(property);
    // const params = { sortPacks: property };
    // dispatch(fetchPacksTC(params));
  };
  const createSortHandler = (property: keyof DataRows) => (event: React.MouseEvent<unknown>) => {
    let propertyKey: string;
    if (property === "cards") {
      propertyKey = "cardsCount";
    }
    if (property === "lastUpdated") {
      propertyKey = "updated";
    }
    if (property === "name") {
      propertyKey = "name";
    }

    // switch (property) {
    //   case "cards":
    //     return (propertyKey = "cardsCount");
    //   case "lastUpdated":
    //     return (propertyKey = "updated");
    //   default:
    //     return propertyKey = property;
    // }
    // console.log("property", property);
    // @ts-ignore
    onRequestSort(event, propertyKey);
    // dispatch(setPacksParams(params));
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
              {/*"2"*/}
              {/*{orderBy === headCell.id ? (*/}
              {/*  <Box component="span" sx={visuallyHidden}>*/}
              {/*    {order === "desc" ? "sorted descending" : "sorted ascending"}*/}
              {/*  </Box>*/}
              {/*) : null}*/}
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
