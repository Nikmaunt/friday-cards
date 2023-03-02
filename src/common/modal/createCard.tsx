import React, { ChangeEvent, useState } from "react";
import s from "./actionModal.module.css";
import { TextField } from "@mui/material";
import { SelectQuestion } from "./selectQuestion";
import { ModalButtons } from "./modalButtons";
import { useAppDispatch } from "../../app/store";
import { addNewCardTC, editCardTC } from "../../feature/cards/cardsReducer";
import { useNavigate } from "react-router-dom";
import { ActivateModalPropsType } from "./addNewPackModal";
import { EditCardRequestType, NewCardRequestType } from "../../feature/cards/cardsAPI";

export const CreateCard = (props: CreateNewCardPropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const addQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };

  const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const addNewCard = async () => {
    if (props.pack_id) {
      setDisabled(true);
      const newCard: NewCardRequestType = {
        card: {
          cardsPack_id: props.pack_id,
          question,
          answer,
        },
      };
      await dispatch(addNewCardTC(newCard));
      setDisabled(false);
      props.setActive(false);
    }
  };

  const editCard = async () => {
    if (props.card_id && props.pack_id) {
      const editCard: EditCardRequestType = {
        card: {
          _id: props.card_id,
          question,
          answer,
        },
      };
      await dispatch(editCardTC(editCard, props.pack_id));
      props.setActive(false);
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
          active={props.active}
          disabled={disabled}
          setActive={props.setActive}
          // changePackName={() => alert("pack")}

          onKeyDownSaveChangeNameHandler={editCard}
        />
      ) : (
        <ModalButtons
          mode={"addCard"}
          pack_id={props.pack_id}
          active={props.active}
          disabled={disabled}
          setActive={props.setActive}
          // changePackName={() => alert("pack")}

          onKeyDownSaveChangeNameHandler={addNewCard}
        />
      )}
    </div>
  );
};

type CreateNewCardPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  mode: "editCard" | "addCard";
  pack_id: string | undefined;
  card_id?: string;
  changeName: () => void;
  pack_name?: string;
  questionTitle?: string;
  answer?: string;
  active: boolean;
  setActive: string;
};
