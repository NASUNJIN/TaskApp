import React, { FC, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/redux';
import { FiPlusCircle } from 'react-icons/fi';
import SideForm from './SideForm/SideForm';
import clsx from 'clsx';
import { 
  addButton, 
  addSection, 
  boardItem, 
  boardItemActive, 
  container, 
  title 
} from './BoardList.css';

type TBoardListProps = {
  activeBoardId : string;
  setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList : FC<TBoardListProps>= ({ activeBoardId, setActiveBoardId }) => {
  
  const { boardArray } = useTypedSelector(state => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false); // 게시판 눌렀을 경우 변경
  const inputRef = useRef<HTMLInputElement>(null);   // + 클릭했을 때 바로 칠 수 있게 커서 가짐

  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
    setTimeout(() => { // 타이밍 문제로 사용
      inputRef.current?.focus();  // Ref가 등록 안되었을 때 = null, Ref 등록되었을 경우 포커스
    }, 0);
  }

  return (
    <div className={container}>
      <div className={title}>
        게시판:
      </div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}
        onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            { // boardId, activeBoardId, index가 모두 같을 경우
              [boardItemActive]: 
                boardArray.findIndex(b => b.boardId === activeBoardId) === index,
            },
            {
              [boardItem]:
                boardArray.findIndex(b => b.boardId === activeBoardId) !== index,
            }
          )}
        >
          <div>
            {board.boardName}
          </div>
        </div>
      ))}
      <div className={addSection}>
        {
          isFormOpen ?
            <SideForm inputRef = {inputRef} setIsFormOpen={setIsFormOpen} />
            :
            <FiPlusCircle className={addButton} onClick={handleClick} />
        }
      </div>
    </div>
  )
}

export default BoardList