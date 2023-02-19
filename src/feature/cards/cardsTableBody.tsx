import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import s from "./Cards.module.css";
import TableBody from "@mui/material/TableBody";
import React from "react";
import { DataCards } from "./cardsTable";

export const CardsTableBody = ({ rows }: PropsType) => {
  return (
    <TableBody>
      {rows?.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow key={index}>
            <TableCell align={"center"} padding={"none"} />
            <TableCell component="th" id={labelId} scope="row" sx={{ paddingRight: "36px", textAlign: "left" }}>
              {row.answer}
            </TableCell>
            <TableCell align="left">{row.grade}</TableCell>
            <TableCell align="left">{row.lastUpdated}</TableCell>
            <TableCell align="left">
              <Box
                sx={{
                  width: 70,
                  display: "flex",
                }}
              >
                <Rating
                  name="text-feedback"
                  value={5}
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <span className={s.icons}>{row.actions}</span>
              </Box>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

/////////// types /////////
type PropsType = {
  rows: DataCards[];
};
