import TablePagination from "@mui/material/TablePagination";
import React from "react";
import { fetchPacksTC, setPacksParams } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { selectorRowsPerPage } from "./packsSelectors";

export const PacksTablePagination = () => {
  const dispatch = useAppDispatch();
  const rowPerPage = useSelector(selectorRowsPerPage);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    const params = { page: newPage };
    dispatch(setPacksParams(params));
    dispatch(fetchPacksTC());
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = { pageCount: +event.target.value };
    dispatch(setPacksParams(params));
    dispatch(fetchPacksTC());
  };
  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 25]}
      component="div"
      count={4200}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
