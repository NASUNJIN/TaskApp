import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
    modalActive : boolean;
    boardArray : IBoard[]
};

type TAddBoardAction = {
    boardId: IBoard;
};

type TDeleteListAction = {
    boardId: string;
    listId: string;
}

type TAddListAction = {
    boardId: string;
    list: IList;
}

type TAddTaskActino = {
    boardId: string;
    listId: string;
    task: ITask;

}

const initialState : TBoardState = {
    modalActive : false,
    boardArray: [
        {
            boardId : "board-0",
            boardName : "첫 번째 게시물",
            lists : [
                {
                    listId : "list-0",
                    listName : "List 1",
                    tasks : [
                        {
                            taskId : "task-0",
                            taskName : "Task 1",
                            taskDescription : "Description",
                            taskOwner : "John",
                        },
                        {
                            taskId : "task-1",
                            taskName : "Task 2",
                            taskDescription : "Description",
                            taskOwner : "John",
                        }
                    ]
                },
                {
                    listId : "list-1",
                    listName : "List 2",
                    tasks : [
                        {
                            taskId : "task-2",
                            taskName : "Task 3",
                            taskDescription : "Description",
                            taskOwner : "John",
                        }
                    ]
                }
            ]
        }
    ]
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.boardId)  // board 추가
        },

        addList: (state, { payload }: PayloadAction<TAddListAction>) => {
            state.boardArray.map(board => board.boardId === payload.boardId
                ? { ...board, lists: board.lists.push(payload.list) }
                : board
            )
        },

        addTask: (state, { payload }: PayloadAction<TAddTaskActino>) => {
            state.boardArray.map(board => board.boardId === payload.boardId
                ? { ...board, 
                    lists: board.lists.map((list) => 
                        list.listId === payload.listId
                        ? { ...list, tasks: list.tasks.push(payload.task) }
                        : list
                    ) 
                }
                : board
            )
        },

        deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map((board) =>
                board.boardId === payload.boardId
                ? 
                {
                    ...board,
                    lists: board.lists.filter(
                        (list) => list.listId !== payload.listId
                    ),
                }
                : board
            );
        },

        setModalActive: (state, { payload }: PayloadAction<boolean>) => {
            state.modalActive = payload
        },


    }
})


export const { addBoard, deleteList, setModalActive, addTask, addList } = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;