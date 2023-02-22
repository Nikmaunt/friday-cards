import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";
import { fetchPacksTC, setPacksParams } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { selectorPacksTotalCount, selectorPage, selectorRowsPerPage } from "./packsSelectors";

export const PacksTablePagination = () => {
  const dispatch = useAppDispatch();
  const totalPacksCount = useSelector(selectorPacksTotalCount);
  const rowPerPage = useSelector(selectorRowsPerPage);
  const selPage = useSelector(selectorPage);
  console.log("selPage", selPage);
  const [page, setPage] = useState(selPage - 1);
  console.log("page", page);

  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const params = { page: newPage + 1 };

    console.log("newPage", newPage);
    dispatch(setPacksParams(params));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const params = { pageCount: parseInt(event.target.value, 10), page: 1 };

    dispatch(setPacksParams(params));
    //setRowsPerPage();
  };

  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 20]}
      component="div"
      count={totalPacksCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
