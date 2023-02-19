import PATH from "../../common/constans/path/path";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DataRows } from "./packsTable";

export const PacksTableBody = ({ rows }: PropsType) => {
  const navigate = useNavigate();
  const goToCardsList = (id: string) => {
    navigate(`${PATH.CARDS_LIST}${id}`);
  };

  return (
    <TableBody>
      {rows.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow key={row.id}>
            <TableCell align={"center"} padding={"none"} />
            <TableCell
              onClick={() => goToCardsList(row.id)}
              component="th"
              id={labelId}
              scope="row"
              sx={{ paddingRight: "36px", textAlign: "left" }}
            >
              {row.name}
            </TableCell>
            <TableCell align="left">{row.cards}</TableCell>
            <TableCell align="left">{row.lastUpdated}</TableCell>
            <TableCell align="left">{row.createdBy}</TableCell>
            <TableCell align="left">{row.actions}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export type PropsType = {
  rows: DataRows[];
};
