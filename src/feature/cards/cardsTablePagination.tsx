import TablePagination from "@mui/material/TablePagination";
import React from "react";
import {getUserCardByPackId, SetCardsPageCount} from "./cardsReducer";
import {useAppDispatch} from "../../app/store";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorCardsPage, selectorCardsTotalCount} from "./cardsSelectors";

export const CardsTablePagination = () => {
  const dispatch = useAppDispatch();
  let cardsPage = useSelector(selectorCardsPage);
  let cardsTotalCount= useSelector(selectorCardsTotalCount);

  const { id } = useParams();
  const [rowsPerPage, setRowsPerPage] = React.useState(cardsPage);
  const [page, setPage] = React.useState(0);


  const lastPage = Math.ceil(cardsTotalCount / cardsPage)
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log( event, 'EVENT')
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetCardsPageCount(+event.target.value));
    if (id) {
      dispatch(getUserCardByPackId(id));
      setRowsPerPage(+event.target.value)
    }
  };
  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 25]}
      component="div"
      count={lastPage}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
