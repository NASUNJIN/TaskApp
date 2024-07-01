import { useState } from 'react';
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css';
import BoardList from './components/BoardList/BoardList';
import ListsContainer from './components/ListsContainer/ListsContainer';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard, sort } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 } from 'uuid';
import { DragDropContext } from '@hello-pangea/dnd';

function App() {
  const dispatch = useTypedDispatch();
  // LoggerModal
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  // activeBoardId : 클릭할때마다 바뀌는 보드 아이디 값
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  // boardArray에서 특정 개체만 가져올 수 있게 하는 로직
  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const lists = getActiveBoard.lists;

  // 게시판 삭제하기 버튼
  const handleDeleteBoard = () => {
    if(boards.length > 1) {
      // boardSlice - deleteBoard
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));

      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 지우기: ${getActiveBoard.boardName}`,
          logAuthor: "User",
          logTimestamp: String(Date.now())
        })
      );

      // 게시판이 삭제되면 다른 게시판이 active한 boardId가 되어야함
      const newIndexToSet = () => {
        // 지우게 되는 index의 boardId를 return
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );

        return indexToBeDeleted === 0 
        ? indexToBeDeleted + 1
        : indexToBeDeleted - 1;
      };

      setActiveBoardId(boards[newIndexToSet()].boardId);

    } else {
      alert('최소 게시판 갯수는 1개 입니다.');
    }
  };

  const handleDragEnd = (result: any) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    console.log('lists', lists);

    const sourceList = lists.filter(
      list => list.listId === source.droppableId
    )[0];
    
    console.log('sourceList', sourceList);

      dispatch( // boardSlice - sort
        sort({
          boardIndex: boards.findIndex((board) => board.boardId === activeBoardId),
          droppableIdStart: source.droppableId,
          droppableIdEnd: destination.droppableId,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
          draggableId
        })
      );

      dispatch(
        addLog({
          logId: v4(),
          logMessage: `
            리스트: ${sourceList.listName}에서 
            리스트 ${lists.filter((list) => list.listId === destination.draggableId)[0].listName}으로
            ${sourceList.tasks.filter((task) => task.taskId === draggableId)[0].taskName}을 옮김.`,
          logAuthor: "User",
          logTimestamp: String(Date.now())
        })
      );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen}/> : null}
      {modalActive ? <EditModal /> : null}

        <BoardList 
          activeBoardId={activeBoardId} 
          setActiveBoardId={setActiveBoardId} 
        />
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>
      
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>

    </div>
  );
}

export default App;
