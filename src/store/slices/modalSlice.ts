import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type TSetModalDataAction = {
    boardId: string;
    listId: string;
    task: ITask;
};

type TModalState = {
    boardId : string;
    listId : string;
    task : ITask;
};


const initialState : TModalState = {
    boardId : "board-0",
    listId : "list-0",
    task : {
        taskId : "task-0",
        taskName : "task 0",
        taskDescription: "task description",
        taskOwner : "John"
    }
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers : {  // 액션 생성하는 함수
        setModalData: (state, {payload}: PayloadAction<TSetModalDataAction>) => {
            state.boardId = payload.boardId;
            state.boardId = payload.listId;
            state.task = payload.task;
        }
    }
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;