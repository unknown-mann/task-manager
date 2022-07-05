import styled from "styled-components";
import { motion } from "framer-motion";

export const Modal = styled(motion.div)`
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
`;

export const ModalContent = styled(motion.div)`
    width: 300px;
    font-size: 20px;
    padding: 30px;
    border-radius: 10px;
    background-color: white;
`;

export const DescriptionArea = styled.textarea`
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

export const SettingButton = styled.button`
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

export const DateInput = styled.input.attrs({
    type: 'date',
})`
    position: absolute;
    margin-top: 5px;
`;

export const RepeatingDaysWrapper = styled.form`
    position: absolute;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
`;

export const DayButton = styled.input.attrs({
    type: 'checkbox'
})`
    display: none;
    :checked + label {
        color: #000000;
        border-color: #000000;
    }
`;

export const DayLabel = styled.label`
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

export const ColorTitle = styled.h3`
    margin: 0;
    margin-top: 45px;
    margin-bottom: 10px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
`;

export const ColorsSelect = styled.form`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-left: -12px;
`;

export const ColorButtonEl = styled.input.attrs({
    type: 'radio',
    name: 'color'
})``;

export const ColorLabel = styled.label`
    display: inline-block;
    width: 20px;
    height: 20px;
`;

export const SaveButton = styled.button`
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