import React, { ChangeEvent, FC, useState } from 'react'
import { FiCheck } from 'react-icons/fi';
import { icon, input, sideForm } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type TSideFormProps = {
  inputRef: React.RefObject<HTMLInputElement>,
  setIsFormOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const SideForm: FC<TSideFormProps>= ({ setIsFormOpen, inputRef }) => {
  const [inputText, setinputText] = useState('');
  const dispatch = useTypedDispatch();

  // 새로운 게시판 이름적을 때 바뀌는 거
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setinputText(e.target.value);
  }

  // 요소가 포커스를 잃는 순간
  const handleOnBlur = () => {
    setIsFormOpen(false);
  }

  const handleClick = () => {
    if(inputText) {
      dispatch(  // boardSlice reducers에 있음
        addBoard({
          board: {
            boardId: uuidv4(), 
            boardName: inputText,
            lists: []
          }
        })
      )

        dispatch(  // loggerSlice reducer
          addLog({
            logId: uuidv4(),
            logMessage: `게시판 등록: ${inputText}`,
            logAuthor: "User",
            logTimestamp: String(Date.now()),
          })
        )
    }
  }

  return (
    <div className={sideForm}>
      <input 
        ref={inputRef}
        // autoFocus // 커서 자동으로 올려줌
        className={input}
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick}/>
    </div>
  )
}

export default SideForm