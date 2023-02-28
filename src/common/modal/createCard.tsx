import React, {ChangeEvent, useState} from "react";
import s from "./actionModal.module.css";
import {Stack, TextField} from "@mui/material";
import {SelectQuestion} from "./selectQuestion";
import {ModalButtons} from "./modalButtons";
import {useAppDispatch} from "../../app/store";
import {addNewCardTC, editCardTC} from "../../feature/cards/cardsReducer";
import {useNavigate} from "react-router-dom";
import PATH from "../../common/constans/path/path";
import {ActivateModalPropsType} from "../../feature/packs/packs";
import Button from '@mui/material/Button';
import {convertFileToBase64} from "../../feature/profile/badgeAvatar";

export const CreateCard = (props: CreateNewCardPropsType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<string>("");
    const [questionImg, setQuestionImg] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [answerImg, setAnswerImg] = useState<string>("");
    // const [isImgBroken, setIsImgBroken] = useState(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [fileFormat, setFileFormat] = useState<string | undefined>(props.questionFormat || "Text");
    const [errorQuestion, setErrorQuestion] = useState<null | string>(null);
    const [errorAnswer, setErrorAnswer] = useState<null | string>(null);

    const addQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorQuestion("");
        setQuestion(e.currentTarget.value);
    };

    const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorAnswer("");
        setAnswer(e.currentTarget.value);
    };
    const setFileFormatHandler = (fileFormat: string) => setFileFormat(fileFormat)

    const addNewCard = async () => {
        if (props.pack_id && question.trim() !== "" && answer.trim() !== "") {
            setDisabled(true);
            await dispatch(addNewCardTC(props.pack_id, question, answer));
            setDisabled(false);
            props.setActive(false);
            navigate(`${PATH.CARDS_LIST}${props.pack_id}`);
            console.log("navigate", props.pack_id);
        }
        if (props.pack_id && questionImg.trim() !== "" && answerImg.trim() !== "") {
            setDisabled(true);
            await dispatch(addNewCardTC(props.pack_id, question, answer,answerImg, questionImg));
            setDisabled(false);
            props.setActive(false);
            navigate(`${PATH.CARDS_LIST}${props.pack_id}`)
        }
        if (question.trim() === "") {
            setErrorQuestion("Question is required");
        }
        if (answer.trim() === "") {
            setErrorAnswer("Answer is required");
        }
    };
    console.log(answerImg)
    const uploadQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setQuestionImg(file64);
                });
            } else {
                console.error("Error: ", "Файл слишком большого размера");
            }
        }
    };
    const uploadAnswerImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAnswerImg(file64);
                });
            } else {
                console.error("Error: ", "Файл слишком большого размера");
            }
        }
    };

    const saveChangeCard = async () => {
        if (props.card_id && props.pack_id) {
            await dispatch(editCardTC(props.pack_id, props.card_id, question, answer,answerImg, questionImg));
            props.setActive(false);
        }
    };
    console.log(fileFormat)
    return (
        <div>
            <SelectQuestion changeQuestionFormat={setFileFormatHandler} questionFormat={props.questionFormat}/>
            {
                fileFormat === 'Text' ?
                    <>
                        <TextField
                            label={"Question"}
                            variant="standard"
                            className={s.nameInput}
                            onChange={addQuestion}
                            error={!!errorQuestion}
                            helperText={errorQuestion}
                            defaultValue={props.questionTitle ? props.questionTitle : question}
                        />
                        <TextField
                            label={"Answer"}
                            defaultValue={props.answer ? props.answer : answer}
                            variant="standard"
                            className={s.nameInput}
                            error={!!errorAnswer}
                            helperText={errorAnswer}
                            style={{marginBottom: "108px"}}
                            onChange={addAnswer}
                        />
                        <ModalButtons
                            mode={props.mode === "editCard" ? "editCard" : "addCard"}
                            pack_id={props.pack_id}
                            active={props.active}
                            disabled={disabled}
                            setActive={props.setActive}
                            changeName={props.changeName}
                            onKeyDownSaveChangeNameHandler={props.mode === "editCard" ? saveChangeCard : addNewCard}
                        />
                    </> :
                    <>
                        <Stack direction="column"
                               justifyContent="space-between"
                               alignItems="center"
                               spacing={2}
                               sx={{marginTop: 5}}>
                            <div>
                                <div>
                                    <img className={s.questionImg} src={questionImg || undefined}/>
                                    <label className={s.uploadButtons}>
                                        <input type="file" onChange={uploadQuestionImgHandler}
                                               className={s.invisibleInput}/>
                                        <Button variant="contained" component="span">
                                            Upload question
                                        </Button>
                                    </label>
                                </div>
                                <div>
                                    <img className={s.answerImg} src={answerImg || undefined}/>
                                    <label className={s.uploadButtons}>
                                        <input type="file" onChange={uploadAnswerImgHandler}
                                               className={s.invisibleInput}/>
                                        <Button sx={{marginTop: 3}} variant="contained" component="span">
                                            Upload answer
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </Stack>
                        <ModalButtons
                            mode={props.mode === "editCard" ? "editCard" : "addCard"}
                            pack_id={props.pack_id}
                            active={props.active}
                            disabled={questionImg.trim() === "" || answerImg.trim() === "" ? true : false}
                            setActive={props.setActive}
                            changeName={props.changeName}
                            onKeyDownSaveChangeNameHandler={props.mode === "editCard" ? saveChangeCard : addNewCard}
                        />
                    </>
            }
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
    questionFormat?: string | undefined
};
