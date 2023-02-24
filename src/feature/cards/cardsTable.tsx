import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useSelector } from "react-redux";
import { selectorCards } from "./cardsSelectors";
import { useNavigate, useParams } from "react-router-dom";
import { selectorCardsPage } from "./cardsSelectors";
import { CardsActionsIconPack } from "./cardsActionsIconPack";
import { CardsType } from "./cardsAPI";
import { CardsTableHead } from "./cardsTableHead";
import { CardsTableBody } from "./cardsTableBody";
import { CardsTablePagination } from "./cardsTablePagination";
import { useAppDispatch } from "../../app/store";
import { getUserCardByPackId } from "./cardsReducer";
import { selectAppStatus } from "../../app/appSelectors";
import PATH from "../../common/constans/path/path";
import Skeleton from "react-loading-skeleton";

export const CardsList = () => {
  const { id } = useParams();
  const cards = useSelector(selectorCards);
  const status = useSelector(selectAppStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const statusApp = useSelector(selectAppStatus);
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
      card.updated.substring(0, 10),
      card.grade,
      <CardsActionsIconPack
        user_id={card.user_id}
        questionTitle={card.question}
        answer={card.answer}
        card_id={card._id}
        pack_id={card.cardsPack_id}
      />
    );
  });
  useEffect(() => {
    if (cards && cards.length === 0 && status === "idle") {
      navigate(PATH.EMPTY_PACK);
    }
  }, [status]);

  return (
    <div>
      {statusApp === "loading" ? (
        <Skeleton height={"60px"} count={5} background-color="#f3f3f3" foreground-color="#ecebeb" />
      ) : (
        <Paper>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <CardsTableHead />
            <CardsTableBody rows={rows} />
          </Table>
          <CardsTablePagination />
        </Paper>
      )}
    </div>
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
