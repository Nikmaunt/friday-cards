import TablePagination from "@mui/material/TablePagination";
import React from "react";
import {getUserCardByPackId, SetCardsPageCount} from "./cardsReducer";
import {useAppDispatch} from "../../app/store";
import {useParams} from "react-router-dom";

export const CardsTablePagination = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log( event, 'EVENT')
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetCardsPageCount(+event.target.value));
    if (id) {
      dispatch(getUserCardByPackId(id));
      setRowsPerPage(parseInt(event.target.value, 10))
    }
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 25]}
      component="div"
      count={12}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
