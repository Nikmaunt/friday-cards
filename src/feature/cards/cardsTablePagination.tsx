import TablePagination from "@mui/material/TablePagination";
import React from "react";
import {getUserCardByPackId, SetCardsPageCount, SetCardsPageNumber} from "./cardsReducer";
import {useAppDispatch} from "../../app/store";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorCardsPage, selectorCardsPageNumber, selectorCardsTotalCount} from "./cardsSelectors";

export const CardsTablePagination = () => {
  const dispatch = useAppDispatch();
  const cardsPageCount = useSelector(selectorCardsPage);
  const cardsPageNumber = useSelector(selectorCardsPageNumber);
  const cardsTotalCount= useSelector(selectorCardsTotalCount);

  const { id } = useParams();
  const [rowsPerPage, setRowsPerPage] = React.useState(cardsPageCount );
  const [page, setPage] = React.useState(0);
  console.log(cardsPageNumber)
  const lastPage = Math.ceil(cardsTotalCount / cardsPageCount)
  console.log(lastPage)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetCardsPageCount(+event.target.value));
    if (id) {
      dispatch(getUserCardByPackId(id));
      // setRowsPerPage(+event.target.value)
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
