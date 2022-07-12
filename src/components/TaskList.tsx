import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Task from "./Task";
import { PropsType } from "../types/Types";

const TaskListEl = styled(motion.section)`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    min-height: 500px;
    margin-right: -60px;
`;

const container = {
    hidden: {
        opacity: 1,
        scale: 0
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1
    }
};

export const TaskList: React.FC<PropsType> = ({ tasks }) => {

    if (!tasks.length) {
        return (
            <h1>There isn`t any tasks</h1>
        )
    }

    return (
        <TaskListEl
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <AnimatePresence>
                {tasks.map((task) => (
                    <motion.div key={task.id! + 1} variants={item}>
                        <Task key={task.id} task={task} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </TaskListEl>
    )
}