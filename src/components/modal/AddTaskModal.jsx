import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { addNewTask } from "../../app/tasksSlice";
import { isTaskRepeating } from "../../utils/utils";
import { COLORS, IS_REPEATING_DAYS, MODAL_EL_VARIANTS, MODAL_CONTENT_VARIANTS } from "../../const";
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
    SaveButton
} from "./Modal";

const Bar = styled.div`
    border-bottom: 10px ${props => props.isRepeat ? 'dashed' : 'solid'} ${props => props.color};
`;


const ColorButton = styled(ColorButtonEl)`
    visibility: hidden; 
    & + label {
        cursor: pointer;
        background-color: ${props => props.value};
        :hover {
            opacity: 0.7;
        }
    };
    :checked + label {
        box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px ${props => props.value};
    }
`;

export const AddTaskModal = ({ modalActive, setModalActive }) => {

    const dispatch = useDispatch();

    const [taskColor, setTaskColor] = useState("black");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [repeatingDays, setRepeatingDays] = useState(IS_REPEATING_DAYS);

    const [isDate, setIsDate] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const handleSetTaskColor = (evt) => setTaskColor(evt.target.value);
    const handleSetDescription = (evt) => setDescription(evt.target.value);
    const handleSetDate = (evt) => setDate(evt.target.value);
    const handleSetRepeatingDays = (evt) => {
        const arr = evt.target.value.split(',');
        setRepeatingDays(
            {
                ...repeatingDays,
                [arr[0]]: arr[1] === 'false' ? true : false
            }
        )
    };

    const toggleDateStatus = () => {
        setIsDate(!isDate)
        setDate("")
    };
    const toggleRepeatStatus = () => {
        setIsRepeat(!isRepeat)
        setRepeatingDays(IS_REPEATING_DAYS)

    };

    const isRepeatAndIsDate = Boolean(date) || isTaskRepeating(repeatingDays)
    const isSaveButtonDisabled = isRepeatAndIsDate && Boolean(description.trim().length)

    const handleAddNewTask = () => {
        dispatch(addNewTask({
            color: taskColor,
            description,
            dueDate: date,
            repeatingDays
        }))
        setTaskColor("black")
        setDescription("")
        setDate("")
        setRepeatingDays(IS_REPEATING_DAYS)
        setIsDate(false)
        setIsRepeat(false)
        setModalActive(false)
    };

    return (
        <AnimatePresence>
            {modalActive && <Modal
                variants={MODAL_EL_VARIANTS}
                animate="visible"
                initial="hidden"
                transition={{ duration: 0.2 }}
                onClick={() => setModalActive(false)}>
                <ModalContent
                    variants={MODAL_CONTENT_VARIANTS}
                    animate="visible"
                    initial="hidden"
                    transition={{ duration: 0.3 }}
                    onClick={e => e.stopPropagation()}>
                    <Bar isRepeat={isRepeat} color={taskColor} />
                    <DescriptionArea value={description} onChange={handleSetDescription} placeholder="Start typing your text here..." />
                    <SettingButton disabled={isRepeat} onClick={toggleDateStatus}>
                        <div>DATE: {isDate ? "YES" : "NO"}</div>
                        {isDate && <DateInput type="date" value={date} onChange={handleSetDate} onClick={e => e.stopPropagation()} />}
                    </SettingButton>
                    <SettingButton disabled={isDate} onClick={toggleRepeatStatus}>
                        <div>REPEAT: {isRepeat ? "YES" : "NO"}</div>
                        {isRepeat &&
                            <RepeatingDaysWrapper onChange={handleSetRepeatingDays} onClick={e => e.stopPropagation()}>
                                {Object.entries(repeatingDays).map(([day, repeat]) => (
                                    <span key={day}>
                                        <DayButton defaultChecked={repeat} value={[day, repeat]} name={day} id={day} />
                                        <DayLabel htmlFor={day}>{day}</DayLabel>
                                    </span>
                                ))}
                            </RepeatingDaysWrapper>}
                    </SettingButton>
                    <ColorTitle>COLOR</ColorTitle>
                    <ColorsSelect onChange={handleSetTaskColor}>
                        {COLORS.map((color, index) => (
                            <span key={color}>
                                <ColorButton defaultChecked={index === 0} value={color} id={color} />
                                <ColorLabel htmlFor={color} />
                            </span>
                        ))}
                    </ColorsSelect>
                    <SaveButton disabled={!isSaveButtonDisabled} onClick={() => handleAddNewTask()}>SAVE</SaveButton>
                </ModalContent>
            </Modal>}
        </AnimatePresence>
    )
}