import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../../hooks/hooks";
import { addNewTask } from "../../app/tasksSlice";
import { isTaskRepeating } from "../../utils/utils";
import {
  COLORS,
  IS_REPEATING_DAYS,
  MODAL_EL_VARIANTS,
  MODAL_CONTENT_VARIANTS,
} from "../../const";
import {
  Modal,
  ModalContent,
  DescriptionArea,
  SettingButton,
  DateInput,
  RepeatingDaysWrapper,
  DayButton,
  DayLabel,
  ColorTitle,
  ColorsSelect,
  ColorButtonEl,
  ColorLabel,
  SaveButton,
} from "./Modal";

const Bar = styled.div<{isRepeat: boolean}>`
  border-bottom: 10px ${(props) => (props.isRepeat ? "dashed" : "solid")}
    ${(props) => props.color};
`;

const ColorButton = styled(ColorButtonEl)`
  visibility: hidden;
  & + label {
    cursor: pointer;
    background-color: ${(props) => props.value};
    :hover {
      opacity: 0.7;
    }
  }
  :checked + label {
    box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px ${(props) => props.value};
  }
`;

type PropsType = {
  modalActive: boolean,
  setModalActive: (arg: boolean) => void
};

export const AddTaskModal: React.FC<PropsType> = ({ modalActive, setModalActive }) => {
  const dispatch = useAppDispatch();

  const [color, setColor] = useState("black");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [repeatingDays, setRepeatingDays] = useState(IS_REPEATING_DAYS);

  const [isDate, setIsDate] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const handleSetTaskColor = (evt: ChangeEvent<HTMLFormElement>) => setColor(evt.target.value);
  const handleSetDescription = (evt: ChangeEvent<HTMLTextAreaElement>) => setDescription(evt.target.value);
  const handleSetDate = (evt: ChangeEvent<HTMLInputElement>) => setDate(evt.target.value);
  const handleSetRepeatingDays = (evt: ChangeEvent<HTMLFormElement>) => {
    const arr = evt.target.value.split(",");
    setRepeatingDays({
      ...repeatingDays,
      [arr[0]]: arr[1] === "false" ? true : false,
    });
  };

  const toggleDateStatus = () => {
    setIsDate(!isDate);
    setDate("");
  };
  const toggleRepeatStatus = () => {
    setIsRepeat(!isRepeat);
    setRepeatingDays(IS_REPEATING_DAYS);
  };

  const isRepeatAndIsDate = Boolean(date) || isTaskRepeating(repeatingDays);
  const isSaveButtonDisabled = isRepeatAndIsDate && Boolean(description.trim().length);

  const handleAddNewTask = () => {
    dispatch(
      addNewTask({
        id: '0',
        color,
        description,
        dueDate: date,
        repeatingDays,
      })
    );
    setColor("black");
    setDescription("");
    setDate("");
    setRepeatingDays(IS_REPEATING_DAYS);
    setIsDate(false);
    setIsRepeat(false);
    setModalActive(false);
  };

  return (
    <AnimatePresence>
      {modalActive && (
        <Modal
          variants={MODAL_EL_VARIANTS}
          animate="visible"
          initial="hidden"
          transition={{ duration: 0.2 }}
          onClick={() => setModalActive(false)}
        >
          <ModalContent
            variants={MODAL_CONTENT_VARIANTS}
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Bar isRepeat={isRepeat} color={color} />
            <DescriptionArea
              value={description}
              onChange={handleSetDescription}
              placeholder="Start typing your text here..."
            />
            <SettingButton disabled={isRepeat} onClick={toggleDateStatus}>
              <div>DATE: {isDate ? "YES" : "NO"}</div>
              {isDate && (
                <DateInput
                  type="date"
                  value={date}
                  onChange={handleSetDate}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </SettingButton>
            <SettingButton disabled={isDate} onClick={toggleRepeatStatus}>
              <div>REPEAT: {isRepeat ? "YES" : "NO"}</div>
              {isRepeat && (
                <RepeatingDaysWrapper
                  onChange={handleSetRepeatingDays}
                  onClick={(e) => e.stopPropagation()}>
                  {Object.entries(repeatingDays).map(([day, repeat]: any) => (
                    <span key={day}>
                      <DayButton
                        defaultChecked={repeat}
                        value={[day, repeat]}
                        name={day}
                        id={day} />
                      <DayLabel htmlFor={day}>{day}</DayLabel>
                    </span>
                  ))}
                </RepeatingDaysWrapper>
              )}
            </SettingButton>
            <ColorTitle>COLOR</ColorTitle>
            <ColorsSelect onChange={handleSetTaskColor}>
              {COLORS.map((taskColor, index) => (
                <span key={taskColor}>
                  <ColorButton
                    defaultChecked={index === 0}
                    value={taskColor}
                    id={taskColor}
                  />
                  <ColorLabel htmlFor={taskColor} />
                </span>
              ))}
            </ColorsSelect>
            <SaveButton
              disabled={!isSaveButtonDisabled}
              onClick={() => handleAddNewTask()}
            >
              SAVE
            </SaveButton>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};
