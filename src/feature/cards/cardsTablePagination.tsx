import TablePagination from "@mui/material/TablePagination";
import React from "react";
import {getUserCardByPackId, SetCardsPageCount, setCardsParams} from "./cardsReducer";
import {useAppDispatch} from "../../app/store";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorCardsPage, selectorCardsRowsPerPage, selectorCardsTotalCount} from "./cardsSelectors";


export const CardsTablePagination = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const cardsTotalCount = useSelector(selectorCardsTotalCount);
  const rowPerPage = useSelector(selectorCardsRowsPerPage)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(rowPerPage);
  const selPage = useSelector(selectorCardsPage);
  const [page, setPage] = React.useState(selPage-1);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const params = { page: newPage + 1 };
    dispatch(setCardsParams(params));
    if (id)
    dispatch(getUserCardByPackId(id));
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetCardsPageCount(+event.target.value));
    const params = { pageCount: parseInt(event.target.value, 10), page: 1 };
    dispatch(setCardsParams(params));
    if (id)
    dispatch(getUserCardByPackId(id));
  };
  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 25]}
      component="div"
      count={cardsTotalCount }
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
