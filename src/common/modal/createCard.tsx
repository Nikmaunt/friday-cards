import React, { ChangeEvent, useState } from "react";
import s from "./actionModal.module.css";
import { TextField } from "@mui/material";
import { SelectQuestion } from "./selectQuestion";
import { ModalButtons } from "./modalButtons";
import { useAppDispatch } from "../../app/store";
import { addNewCardTC, editCardTC } from "../../feature/cards/cardsReducer";

type CreateNewCardPropsType = {
  mode: "editCard" | "addCard";
  pack_id: string;
  card_id?: string;
  changeName: () => void;
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

  const onKeyDownSaveAddCardHandler = () => {
    dispatch(addNewCardTC(props.pack_id, question, answer));
  };

  const onKeyDownSaveChangeCardHandler = () => {
    if (props.card_id) {
      dispatch(editCardTC(props.pack_id, props.card_id, question, answer));
    }
  };

  return (
    <div>
      <SelectQuestion />
      <TextField label={"Question"} variant="standard" className={s.nameInput} onChange={addQuestion} />
      <TextField
        label={"Answer"}
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
