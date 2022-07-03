import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editTask } from "./tasksSlice";
import { isTaskRepeating } from "../utils/utils";

const ModalEl = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    transition: 0.4s;
    opacity: ${props => props.isActive ? '1' : '0'};
    pointer-events: ${props => props.isActive ? 'all' : 'none'};
`;

const ModalContent = styled.div`
    width: 300px;
    font-size: 20px;
    padding: 30px;
    border-radius: 10px;
    background-color: white;
    transition: 0.3s all;
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0)'};
`;

const Bar = styled.div`
    border-bottom: 10px ${props => props.isRepeat ? 'dashed' : 'solid'} ${props => props.color};
`;

const DescriptionArea = styled.textarea`
    font-family: inherit;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0;
    margin-top: 10px;
    resize: none;
    height: 150px;
    width: 100%;
    outline: none;
    padding: 3px;
    font-weight: 500;
    font-size: 16px;
    overflow: auto;
    border-color: transparent;
    line-height: 1.15;
`;

const SettingButton = styled.button`
    display: block;
    width: auto;
    border: 0;
    padding: 0;
    margin: 0;
    margin-bottom: 30px;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid #000000;
    outline: none;
    background-color: transparent;
`;

const DateInput = styled.input.attrs({
    type: 'date',
})`
    position: absolute;
    margin-top: 5px;
`;

const RepeatingDaysWrapper = styled.form`
    position: absolute;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
`;

const DayButton = styled.input.attrs({
    type: 'checkbox'
})`
    display: none;
    :checked + label {
        color: #000000;
        border-color: #000000;
    }
`;

const DayLabel = styled.label`
    display: inline-block;
    width: 30px;
    padding: 3px;
    text-align: center;
    font-size: 16px;
    color: #e3dede;
    border: 1px solid #e3dede;
    cursor: pointer;
    text-transform: lowercase;
`;

const ColorTitle = styled.h3`
    margin: 0;
    margin-top: 45px;
    margin-bottom: 10px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
`;

const ColorsSelect = styled.form`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-left: -12px;
`;

const ColorButton = styled.input.attrs({
    type: 'radio',
    name: 'color'
})`
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

const ColorLabel = styled.label`
    display: inline-block;
    width: 20px;
    height: 20px;
`;

const SaveButton = styled.button`
    width: 100%;
    border: 1px solid #000000;
    font-size: 14px;
    padding: 5px 0;
    cursor: pointer;
    background-color: transparent;
    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const AddTaskModal = ({task, active, setActive}) => {

    const COLORS = ['black', 'gold', 'blue', 'green', 'fuchsia'];

    const dispatch = useDispatch();

    const [taskColor, setTaskColor] = useState(task.color);
    const [description, setDescription] = useState(task.description);

    const [date, setDate] = useState(task.dueDate);

    const [repeatingDays, setRepeatingDays] = useState(task.repeatingDays);

    const [isDate, setIsDate] = useState(task.dueDate);
    const [isRepeat, setIsRepeat] = useState(() => isTaskRepeating(task.repeatingDays));

    const handleEditTask = () => {
        dispatch(editTask({
            id: task.id,
            color: taskColor,
            description,
            dueDate: date,
            repeatingDays
        }))
        setActive(false)
    };

    const handleSetTaskColor = evt => setTaskColor(evt.target.value);

    const handleSetDescription = evt => setDescription(evt.target.value);

    const handleSetDate = evt => setDate(evt.target.value);

    const handleSetRepeatingDays = evt => {
        console.log(evt.target.value)
        setRepeatingDays(
            {
                ...repeatingDays,
                [evt.target.value]: true
            }
        )
    };

    const toggleDateStatus = () => {
        setIsDate(!isDate)
        setDate("")
    };

    const toggleRepeatStatus = () => {
        setIsRepeat(!isRepeat)

    };

    return (
        <ModalEl isActive={active} onClick={() => setActive(false)}>
        <ModalContent isActive={active} onClick={e => e.stopPropagation()}>
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
                                    <DayButton defaultChecked={repeat} value={day} name={day} id={day} />
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
            <SaveButton disabled={!description.trim()} onClick={() => handleEditTask()}>UPDATE</SaveButton>
        </ModalContent>
    </ModalEl>
    );
};

export default AddTaskModal;