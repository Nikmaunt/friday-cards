import React, { useRef, MutableRefObject } from "react";
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

type a = {
  orderRef: MutableRefObject<Order>;
};

export const PacksTableHead = ({ orderRef }: a) => {
  // const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>();
  const dispatch = useAppDispatch();
  // const orderRef = useRef<Order>("asc");

  const onRequestSort = (event: React.MouseEvent<unknown>, property: string, order: Order) => {
    // const isAsc = orderBy === property && order === "asc";
    // setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    //0 от большего desk - стрелка вниз
    //1 от меньшего к большему ask - стрелка вверх
    let sortDirection;
    let cellName = property;

    console.log("orderBy", orderBy);
    console.log("property", property);
    // console.log("isAsc", isAsc);
    console.log("order", orderRef.current);
    // if (orderBy === property) {
    if (property === "cards") {
      cellName = "cardsCount";
    } else if (property === "lastUpdated") {
      cellName = "updated";
    }
    // if (isAsc) {
    if (order === "asc") {
      //стрелка вниз
      // setOrder("desc");
      orderRef.current = "desc";
      let params = { sortPacks: `0${cellName}` };
      console.log(params);
      dispatch(fetchPacksTC(params));
    }
    if (order === "desc") {
      // setOrder("asc");
      orderRef.current = "asc";
      let params = { sortPacks: `1${cellName}` };
      console.log(params);
      dispatch(fetchPacksTC(params));
    }
    // console.log("if property", property);
    // if (order === "asc") {
    //   console.log("стрелка вниз", order);
    //   console.log("стрелка вниз property", property);
    //   if (property === "cards") {
    //     params = { sortPacks: `0cardsCount` };
    //   } else if (property === "lastUpdated") {
    //     params = { sortPacks: `0updated` };
    //   } else {
    //     params = { sortPacks: `0${property}` };
    //   }
    // if (property === )
    // params = { sortPacks: `0${property}` };
    // setOrder("desc");
    // dispatch(fetchPacksTC(params));
    // console.log("стрелка вниз setOrder", order);
    // @ts-ignore
    // setOrder("desk");
    // } else {
    //   console.log("стрелка вверх", order);
    //   console.log("стрелка вверх property", property);
    //   console.log("orderBy", orderBy);
    //   if (property === "cards") {
    //     params = { sortPacks: `1cardsCount` };
    //   } else if (property === "lastUpdated") {
    //     params = { sortPacks: `1updated` };
    //   } else {
    //     params = { sortPacks: `1${property}` };
    //   }
    //   // setOrder("asc");
    //   console.log("стрелка вверх setOrder", order);
    //   // dispatch(fetchPacksTC(params));
    //   // @ts-ignore
    //   setOrder("ask");
    // }
    // }
    // setOrder(isAsc ? "desc" : "asc");
    //
    // setOrderBy(property);
  };

  const createSortHandler = (property: keyof DataRows, order: Order) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property, order);
  };

  console.log("from render asc", orderRef.current);
  return (
    <TableHead className={s.headCell}>
      <TableRow>
        <TableCell padding="none"></TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? orderRef.current : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? orderRef.current : "asc"}
              // onClick={createSortHandler(headCell.id, order)}
              onClick={(e) => onRequestSort(e, headCell.id, orderRef.current)}
            >
              {headCell.label}
              {/*"2"*/}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {orderRef.current === "desc" ? "sorted descending" : "sorted ascending"}
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
export type Order = "asc" | "desc";
