import React, { ChangeEvent } from "react";
import { useAppDispatch } from "../hooks/hooks";
import styled from "styled-components";
import { switchSortType } from "../app/tasksSlice";

const SortEl = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const SortButton = styled.input.attrs({
  type: "radio",
  name: "sort",
})`
  display: none;
  :checked + label {
    font-weight: bold;
  }
`;

const SortLabel = styled.label`
  margin-right: 50px;
  padding: 0;
  font-size: 16px;
  font-weight: normal;
  color: inherit;
  background-color: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :active {
    opacity: 0.5;
  }
`;

const SortBar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const onClickHandler = (e: ChangeEvent<HTMLFormElement>) => dispatch(switchSortType(e.target.value));

  return (
    <SortEl onChange={onClickHandler}>
      <>
        <SortButton defaultChecked id="default" value="default" />
        <SortLabel htmlFor="default">SORT BY DEFAULT</SortLabel>
      </>
      <>
        <SortButton id="up" value="up" />
        <SortLabel htmlFor="up">SORT BY DATE up</SortLabel>
      </>
      <>
        <SortButton id="down" value="down" />
        <SortLabel htmlFor="down">SORT BY DATE down</SortLabel>
      </>
    </SortEl>
  );
});

export default SortBar;
