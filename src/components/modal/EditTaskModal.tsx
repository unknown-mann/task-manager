import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { TaskType } from "../../types/Types";
import { useEditTaskMutation } from "../../app/tasksApi";
import { isTaskRepeating } from "../../utils/utils";
import { COLORS, MODAL_EL_VARIANTS, MODAL_CONTENT_VARIANTS, IS_REPEATING_DAYS } from "../../const";
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

const Bar = styled.div<{ isRepeat: boolean }>`
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

type PropsType = {
    task: TaskType,
    modalActive: boolean,
    setModalActive: (arg: boolean) => void
}

const UpdateTaskModal: React.FC<PropsType> = ({ task, modalActive, setModalActive }) => {

    const [taskColor, setTaskColor] = useState(task.color);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.dueDate);
    const [repeatingDays, setRepeatingDays] = useState(task.repeatingDays);

    const [isDate, setIsDate] = useState(Boolean(task.dueDate));
    const [isRepeat, setIsRepeat] = useState(() => Boolean(isTaskRepeating(task.repeatingDays)));

    const handleSetTaskColor = (evt: ChangeEvent<HTMLFormElement>) => setTaskColor(evt.target.value);
    const handleSetDescription = (evt: ChangeEvent<HTMLTextAreaElement>) => setDescription(evt.target.value);
    const handleSetDate = (evt: ChangeEvent<HTMLInputElement>) => setDate(evt.target.value);
    const handleSetRepeatingDays = (evt: ChangeEvent<HTMLFormElement>) => {
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

    const [updateTask, { isLoading }] = useEditTaskMutation()

    const handleUpdateTask = async () => {
        try {
            await updateTask({
                id: task.id,
                color: taskColor,
                description,
                dueDate: date,
                repeatingDays
            }).unwrap()
            setModalActive(false)
        } catch {
            alert('Failed to edit the task')
        }
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
                        {isRepeat && (
                            <RepeatingDaysWrapper
                                onChange={handleSetRepeatingDays}
                                onClick={e => e.stopPropagation()}>
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
                            </RepeatingDaysWrapper>)}
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
                    <UpdateButton disabled={!isUpdateButtonDisabled || isLoading} onClick={handleUpdateTask}>
                        {isLoading ? 'UPDATING...' : 'UPDATE'}
                    </UpdateButton>
                </ModalContent>
            </Modal>}
        </AnimatePresence>
    );
};

export default UpdateTaskModal;