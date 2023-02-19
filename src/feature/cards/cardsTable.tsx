import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useSelector } from "react-redux";
import { selectorCards } from "./cardsSelectors";
import { Navigate, useParams } from "react-router-dom";
import { CardsActionsIconPack } from "./cardsActionsIconPack";
import PATH from "../../common/constans/path/path";
import { CardsType } from "./cardsAPI";
import { CardsTableHead } from "./cardsTableHead";
import { CardsTableBody } from "./cardsTableBody";
import { CardsTablePagination } from "./cardsTablePagination";
import { useAppDispatch } from "../../app/store";
import { getUserCardByPackId } from "./cardsReducer";

export const CardsList = () => {
  const { id } = useParams();
  const cards = useSelector(selectorCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getUserCardByPackId(id));
    }
  }, []);

  function createData(question: string, answer: string, lastUpdated: string, grade: number, actions: any): DataCards {
    return { question, answer, lastUpdated, grade, actions };
  }

  const rows = cards?.map((card: CardsType) => {
    return createData(
      card.question,
      card.answer,
      card.updated,
      card.grade,
      <CardsActionsIconPack user_id={card.user_id} />
    );
  });

  if (cards && cards.length === 0) {
    return <Navigate to={PATH.EMPTY_PACK} />;
  }
  return (
    <Paper>
      <Table aria-labelledby="tableTitle" size={"medium"}>
        <CardsTableHead />
        <CardsTableBody rows={rows} />
      </Table>
      <CardsTablePagination />
    </Paper>
  );
};

////////types //////////

export type DataCards = {
  question: string;
  answer: string;
  lastUpdated: string;
  grade: number;
  actions: string;
};
