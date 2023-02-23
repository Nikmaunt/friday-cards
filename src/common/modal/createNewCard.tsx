import React, { ChangeEvent, useState } from "react";
import s from "./actionModal.module.css";
import { TextField } from "@mui/material";
import { SelectQuestion } from "./selectQuestion";
import { ModalButtons } from "./modalButtons";
import { addPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { addNewCardTC } from "../../feature/cards/cardsReducer";
import PATH from "../../common/constans/path/path";
import { useNavigate } from "react-router-dom";

type CreateNewCardPropsType = {
  pack_id: string;
  changeName: () => void;
};

export const CreateNewCard = (props: CreateNewCardPropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const addQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("question", question);
    setQuestion(e.currentTarget.value);
  };

  const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("answer", answer);
    setAnswer(e.currentTarget.value);
  };

  const onKeyDownSaveAddCardHandler = () => {
    console.log("on");
    console.log("AddQuestion", question);
    console.log("AddAnswer", answer);
    dispatch(addNewCardTC(props.pack_id, question, answer));
    // navigate(`${PATH.CARDS_LIST}${props.pack_id}`);
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
      <ModalButtons
        mode={"addCard"}
        pack_id={props.pack_id}
        // changePackName={() => alert("pack")}
        changeName={props.changeName}
        onKeyDownSaveChangeNameHandler={onKeyDownSaveAddCardHandler}
      />
    </div>
  );
};
