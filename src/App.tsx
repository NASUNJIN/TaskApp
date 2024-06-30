import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { appContainer, board, buttons } from './App.css'
import BoardList from './components/BoardList/BoardList'
import ListsContainer from './components/ListsContainer/ListsContainer';
import { useTypedSelector } from './hooks/redux';

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');  // activeBoardId : 클릭할때마다 바뀌는 보드 아이디 값

  const boards = useTypedSelector(state => state.boards.boardArray);

  // boardArray에서 특정 개체만 가져올 수 있게 하는 로직
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];

  const lists = getActiveBoard.lists;

  return (
    <div className={appContainer}>
        <BoardList 
          activeBoardId={activeBoardId} 
          setActiveBoardId={setActiveBoardId} 
        />
      <div  className={board}>
        <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
      </div>
      
      <div className={buttons}>
        <button>
          이 게시판 삭제하기
        </button>
        <button>

        </button>
      </div>

    </div>
  );
}

export default App;
