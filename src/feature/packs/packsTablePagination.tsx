import TablePagination from "@mui/material/TablePagination";
import React, { useEffect, useState } from "react";
import { PackParamsType, setPacksParams } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { selectorPacksParams, selectorPacksTotalCount, selectorRowsPerPage } from "./packsSelectors";
import { useSearchParams } from "react-router-dom";

export const PacksTablePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const totalPacksCount = useSelector(selectorPacksTotalCount);
  const packsStateParams = useSelector(selectorPacksParams);
  const rowPerPage = useSelector(selectorRowsPerPage);
  console.log(searchParams);
  const [page, setPage] = useState<number>(Number(searchParams.get("page")) - 1 || 1);
  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [packsStateParams]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const urlParams: PackParamsType = { page: newPage };
    console.log("urlParams", urlParams);
    // @ts-ignore
    setSearchParams(urlParams);

    const params = { page: newPage };
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
