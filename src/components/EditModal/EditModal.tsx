import { ChangeEvent, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { buttons, closeButton, deleteButton, header, input, modalWindow, title, updateButton, wrapper } from './EditModal.css';

const EditModal = () => {
  const dispatch = useTypedDispatch();  // X 클릭하면 창 끄기
  const editingState = useTypedSelector((state) => state.modal);
  // 변경한 값을 통해 업데이트 해야함
  const [ data, setData ] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false)); // boardSlice - setModalActive
  };

  // data 값 바꾸기
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 얕은 복사
    setData({
      ...data,
      task: {
        ...data.task,
        taskName: e.target.value
      }
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskDescription: e.target.value
      }
    });
  };

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskOwner: e.target.value
      }
    });
  };

  // 일 수정하기 버튼
  const handleUpdate = () => {
    console.log("Updating task with data:", data);
    dispatch( // boardsSlice - updateTask
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task : data.task
      })
    );

    dispatch(  // log 추가
      addLog({
        logId: v4(),
        logMessage: `일 수정하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    );

    dispatch(setModalActive(false));
  };

  // 삭제하기 버튼
  const handleDelete = () => {
    console.log("Deleting task with id:", data.task.taskId);
    dispatch( // boardsSlice - deleteTask
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId
      })
    );

    dispatch(  // log 추가
      addLog({
        logId: v4(),
        logMessage: `일 삭제하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    ); 

    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div> {/* 변하는 값이어서 data 말고 taskName 사용 */}
          <FiX className={closeButton} onClick={handleCloseButton}/> {/* X 아이콘, 클릭하면 창 끄기 */}
        </div>
        <div className={title}>제목</div>
        <input 
          className={input}
          type='text'
          value={data.task.taskName}
          onChange={handleNameChange}
        />
        <div className={title}>설명</div>
        <input 
          className={input}
          type='text'
          value={data.task.taskDescription}
          onChange={handleDescriptionChange}
        />
        <div className={title}>생성한 사람</div>
        <input 
          className={input}
          type='text'
          value={data.task.taskOwner}
          onChange={handleAuthorChange}
        />
        <div className={buttons}>
          <button onClick={handleUpdate} className={updateButton}>
            일 수정하기
          </button>
          <button onClick={handleDelete} className={deleteButton}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;