import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/hooks";
import { formatTaskDueDate } from "../utils/utils";
import { isTaskExpired, isTaskRepeating, taskRepeatingDays } from "../utils/utils";
import { deleteTask, toggleArchive, toggleFavorite } from "../app/tasksSlice";
import { TaskType } from "../types/Types";
import { motion } from "framer-motion";
import EditTaskModal from "./modal/EditTaskModal";

const TaskEl = styled(motion.article)`
    position: relative;
    width: 250px;
    min-height: 240px;
    margin-bottom: 40px;
    margin-right: 59px;
`
const TaskContent = styled.div<{isExpired: boolean}>`
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 5px 25px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: ${props => props.isExpired ? '0 2px 38px 0 rgba(240, 0, 0, 0.19)' : '0 9px 38px 0 rgb(0 17 45 / 12%)'};
    background-color: #ffffff;
    outline: 0;
    :hover {
        outline: 10px solid white;
        transition: outline-width 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        box-shadow: ${props => props.isExpired 
            ? 
            '0 -14px 38px 0 rgba(240, 0, 0, 0.19), 0 14px 38px 0 rgba(240, 0, 0, 0.19);' 
            : 
            '0 -14px 38px 0 rgba(35, 113, 245, 0.07), 0 14px 38px 0 rgba(35, 113, 245, 0.07);'}
        z-index: 1;
        button {
            opacity: 1;
            :hover {
                opacity: 0.7;
            };
            :active {
                opacity: 0.5;
            }
        }
        div {
            opacity: 1;
        }
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.button`
    margin-bottom: 10px;
    padding: 0;
    border: 0;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    opacity: 0;
    transition: 0.4s;
    color: ${props => props.color || 'inherit'};
    :hover {
        transition: 0s;
    };
`;

const ColorEl = styled.span<{isRepeating: boolean, isExpired: boolean}>`
    border-bottom: 10px ${props => props.isRepeating ? 'dashed' : 'solid'} ;
    border-color: ${props => props.isExpired ? 'red' : props.color};
`;

const DescriptionEl = styled.span`
    margin-top: 15px;
    margin-bottom: 10px;
    font-weight: 500;
    overflow: auto;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
`;

const DateEl = styled.span<{isExpired: boolean}>`
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.isExpired ? 'red' : 'black'}
`;

const RepeatingDays = styled.div`
    opacity: 0;
    transition: 0.4s;
    margin-bottom: 10px;
    font-size: 10px;
`;

type PropsType = {
    task: TaskType
};

const Task: React.FC<PropsType> = React.memo(({ task }) => {

    const {
        id,
        color,
        description,
        dueDate,
        isArchived,
        isFavorite,
        repeatingDays
    } = task

    const dispatch = useAppDispatch();

    const [modalActive, setModalActive] = useState(false)

    const handleToggleArchive = (id: string) => dispatch(toggleArchive(id));
    const handleToggleFavorite = (id: string) => dispatch(toggleFavorite(id));
    const handleDeleteTask = (id: string) => dispatch(deleteTask(id));

    const isExpired = isTaskExpired(dueDate)
    const isRepeating = isTaskRepeating(repeatingDays)
    const repeatsOn = taskRepeatingDays(repeatingDays)

    return (
        <TaskEl
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}>
            <TaskContent isExpired={isExpired as boolean}>
                <ButtonsWrapper>
                    <Button onClick={() => setModalActive(true)}>EDIT</Button>
                    <Button onClick={() => handleToggleArchive(id)}>
                        {isArchived ? 'UNARCHIVE' : 'ARCHIVE'}</Button>
                    <Button onClick={() => handleToggleFavorite(id)}>{isFavorite ? 'DEL ' : 'ADD '}FAV</Button>
                </ButtonsWrapper>
                <ColorEl color={color} isExpired={isExpired as boolean} isRepeating={isRepeating} />
                <DescriptionEl>{description}</DescriptionEl>
                <Wrapper>
                    <DateEl isExpired={isExpired as boolean}>
                        {formatTaskDueDate(dueDate) ||
                            (isRepeating &&
                                <RepeatingDays>
                                    <div>REPEATS ON:</div>
                                    {repeatsOn.map(day => (
                                        <span key={day[0]}> {day[0]}</span>
                                    ))}
                                </RepeatingDays>)}
                    </DateEl>
                    <Button onClick={() => handleDeleteTask(id)} color="red">DELETE</Button>
                </Wrapper>
            </TaskContent>
            {modalActive && <EditTaskModal modalActive={modalActive} setModalActive={setModalActive} task={task} />}
        </TaskEl>
    );
});

export default Task;