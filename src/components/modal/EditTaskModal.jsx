import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { updateTask } from "../../app/tasksSlice";
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
    SaveButton as UpdateButton
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

const UpdateTaskModal = ({ task, modalActive, setModalActive }) => {

    const dispatch = useDispatch();

    const [taskColor, setTaskColor] = useState(task.color);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.dueDate);
    const [repeatingDays, setRepeatingDays] = useState(task.repeatingDays);

    const [isDate, setIsDate] = useState(task.dueDate);
    const [isRepeat, setIsRepeat] = useState(() => isTaskRepeating(task.repeatingDays));

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
    const isUpdateButtonDisabled = isRepeatAndIsDate && Boolean(description.trim().length)

    const handleUpdateTask = () => {
        dispatch(updateTask({
            id: task.id,
            color: taskColor,
            description,
            dueDate: date,
            repeatingDays
        }))
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
                        {COLORS.map(color => (
                            <span key={color}>
                                <ColorButton defaultChecked={color === taskColor} value={color} id={color} />
                                <ColorLabel htmlFor={color} />
                            </span>
                        ))}
                    </ColorsSelect>
                    <UpdateButton disabled={!isUpdateButtonDisabled} onClick={() => handleUpdateTask()}>UPDATE</UpdateButton>
                </ModalContent>
            </Modal>}
        </AnimatePresence>
    );
};

export default UpdateTaskModal;