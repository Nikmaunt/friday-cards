import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useSelector } from "react-redux";
import { selectorCards } from "./cardsSelectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardsActionsIconPack } from "./cardsActionsIconPack";
import { CardsTableHead } from "./cardsTableHead";
import { CardsTableBody } from "./cardsTableBody";
import { CardsTablePagination } from "./cardsTablePagination";
import { useAppDispatch } from "../../app/store";
import { getCardsTC } from "./cardsReducer";
import { selectAppStatus } from "../../app/appSelectors";
import PATH from "../../common/constans/path/path";
import { SkeletonLoader } from "../../common/skeletonLoader/skeletonLoader";
import { CardsType } from "./cardsAPI";

export const CardsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);

  const cards = useSelector(selectorCards);
  const status = useSelector(selectAppStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const statusApp = useSelector(selectAppStatus);

  useEffect(() => {
    dispatch(getCardsTC(URLParams));
  }, [searchParams]);

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
        <SkeletonLoader height={"60px"} count={5} />
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
