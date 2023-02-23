import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./actionModal.module.css";
import { TextField } from "@mui/material";
import { SelectQuestion } from "./selectQuestion";
import { ModalButtons } from "./modalButtons";
import { useAppDispatch } from "../../app/store";
import { addNewCardTC, editCardTC, getUserCardByPackId } from "../../feature/cards/cardsReducer";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type CreateNewCardPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  mode: "editCard" | "addCard";
  pack_id: string;
  card_id?: string;
  changeName: () => void;
  pack_name?: string;
  questionTitle?: string;
  answer?: string;
};

export const CreateCard = (props: CreateNewCardPropsType) => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const addQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };

  const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const onKeyDownSaveAddCardHandler = async () => {
    await dispatch(addNewCardTC(props.pack_id, question, answer));
    props.setActive(false);
  };

  const onKeyDownSaveChangeCardHandler = () => {
    if (props.card_id) {
      dispatch(editCardTC(props.pack_id, props.card_id, question, answer));
    }
  };

  return (
    <div>
      <SelectQuestion />
      <TextField
        label={"Question"}
        variant="standard"
        className={s.nameInput}
        onChange={addQuestion}
        defaultValue={props.questionTitle ? props.questionTitle : question}
      />
      <TextField
        label={"Answer"}
        defaultValue={props.answer ? props.answer : answer}
        variant="standard"
        className={s.nameInput}
        style={{ marginBottom: "108px" }}
        onChange={addAnswer}
      />
      {props.mode === "editCard" ? (
        <ModalButtons
          mode={"editCard"}
          pack_id={props.pack_id}
          // changePackName={() => alert("pack")}
          changeName={props.changeName}
          onKeyDownSaveChangeNameHandler={onKeyDownSaveChangeCardHandler}
        />
      ) : (
        <ModalButtons
          mode={"addCard"}
          pack_id={props.pack_id}
          // changePackName={() => alert("pack")}
          changeName={props.changeName}
          onKeyDownSaveChangeNameHandler={onKeyDownSaveAddCardHandler}
        />
      )}
    </div>
  );
};
