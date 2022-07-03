import React, {useState} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { formatTaskDueDate } from "../utils/utils";
import { isTaskExpired, isTaskRepeating, taskRepeatingDays } from "../utils/utils";
import { deleteTask, toggleArchive, toggleFavorite } from "./tasksSlice";
import { motion } from "framer-motion";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskEl = styled(motion.article)`
    position: relative;
    width: 250px;
    min-height: 240px;
    margin-bottom: 40px;
    margin-right: 59px;
`
const TaskContent = styled.div`
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
        transition: outline-width 0.2s ease-in-out;
        box-shadow: 0 -14px 38px 0 rgba(35, 113, 245, 0.07),
          0 14px 38px 0 rgba(35, 113, 245, 0.07);
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
    background-image: ${props => props.favorite ? 'linear-gradient(45deg, #CA4246 16.666%, #E16541 16.666%, #E16541 33.333%, #F18F43 33.333%, #F18F43 50%, #8B9862 50%, #8B9862 66.666%, #476098 66.666%, #476098 83.333%, #A7489B 83.333%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' : 'inherit'};
    :hover {
        transition: 0s;
    };
`;

const ColorEl = styled.span`
    border-bottom: 10px ${props => props.isRepeating ? 'dashed' : 'solid'} ;
    border-color: ${props => props.isExpired ? 'red' : props.color};
`;

const DescriptionEl = styled.span`
    margin-top: 15px;
    margin-bottom: 10px;
    font-weight: 500;
    overflow: scroll;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
`;

const DateEl = styled.span`
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

const Task = ({ task }) => {

    const [active, setActive] = useState(false)

    const dispatch = useDispatch();

    const handleToggleArchive = (id) => dispatch(toggleArchive(id));
    const handleToggleFavorite = (id) => dispatch(toggleFavorite(id));
    const handleDeleteTask = (id) => dispatch(deleteTask(id));

    const {
        id,
        color,
        description,
        dueDate,
        isArchived,
        isFavorite,
        repeatingDays
    } = task

    const isExpired = isTaskExpired(dueDate)
    const isRepeating = isTaskRepeating(repeatingDays)
    const repeatsOn = taskRepeatingDays(repeatingDays)

    return (
        <TaskEl
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{duration: 0.2}}
        >
            <TaskContent isExpired={isExpired}>
                <ButtonsWrapper>
                    <Button onClick={() => setActive(true)}>EDIT</Button>
                    <Button onClick={() => handleToggleArchive(id)}>
                        {isArchived ? 'UNARCHIVE' : 'ARCHIVE'}</Button>
                    <Button onClick={() => handleToggleFavorite(id)} favorite={isFavorite}>FAVORITES</Button>
                </ButtonsWrapper>
                <ColorEl color={color} isExpired={isExpired} isRepeating={isRepeating} />
                <DescriptionEl>{description}</DescriptionEl>
                <Wrapper>
                    <DateEl isExpired={isExpired}>
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
            <UpdateTaskModal active={active} setActive={setActive} task={task}/>
        </TaskEl>
    );
};

export default Task;