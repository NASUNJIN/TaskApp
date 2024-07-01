import React, { ChangeEvent, FC, useState } from 'react'
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { v4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import { button, buttons, close, input, listForm, taskForm } from './DropDown.css';

type TDropDownFormProps = {
  boardId: string;
  listId: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  list?: boolean;
};

const DropDownForm: FC<TDropDownFormProps> = ({ boardId, listId, setIsFormOpen, list }) => {
  const dispatch = useTypedDispatch();

  // 새로운 일 등록 눌렀을 때, 일의 제목을 입력하는 곳의 값을 기억하기 위한 state
  const [text, settext] = useState('');  

  const formPlaceholder = list ? "리스트의 제목을 입력하세요" : "일의 제목을 입력하세요";
  const buttonTitle = list ? "리스트 추가하기" : "일 추가하기";

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    settext(e.target.value);
  };

  const handleButtonClick = () => {
    // text 없을 경우 아무일도 안일어남
    if (text) {
      if (list) { // list 생성
        dispatch( // boardSlice - addList
          addList({
            boardId, list: { listId: v4(), listName: text, tasks: [] }
          })
        );

        dispatch(  // log 추가
          addLog({
            logId: v4(),
            logMessage: `리스트 생성하기: ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now())
          })
        );
      } else {  // task 생성
        dispatch( // boardSlice - addTask
          addTask({
            boardId, listId,
            task: {
              taskId: v4(),
              taskName: text,
              taskDescription: "",
              taskOwner: "User",
            }
          })
        );

        dispatch(  // log 추가
          addLog({
            logId: v4(),
            logMessage: `일 생성하기: ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now())
          })
        );
      }
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea 
        className={input}
        value={text}
        onChange={handleTextChange}
        autoFocus
        placeholder={formPlaceholder}
        onBlur={() => setIsFormOpen(false)}  // 열린거 누를 경우 닫아짐
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;