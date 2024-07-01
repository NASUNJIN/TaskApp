import { FC } from 'react'
import { GrSubtract } from 'react-icons/gr'
import Task from '../Task/Task'
import ActionButton from '../ActionButton/ActionButton'
import { IList, ITask } from '../../types'
import { useTypedDispatch } from '../../hooks/redux'
import { deleteList, setModalActive } from '../../store/slices/boardsSlice'
import { v4 } from 'uuid'
import { addLog } from '../../store/slices/loggerSlice'
import { setModalData } from '../../store/slices/modalSlice'
import { deleteButton, header, listWrapper, name } from './List.css'
import { Droppable } from '@hello-pangea/dnd'

type TListProps = {
  boardId: string;
  list: IList;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  // store에 있는 값 변경
  const dispatch = useTypedDispatch();

  // - 누르면 삭제
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({boardId, listId}));   // boardSlice deleteList
    dispatch(    // 지운 유저
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )
  }

  // task누를 시 모달 띄우기
  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask,
  ) => {
    dispatch(setModalData({ boardId, listId, task }));  // modalSlice
    dispatch(setModalActive(true)); // boardSlice
  }

  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div 
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={listWrapper}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            {/* 표시 */}
            <GrSubtract
              className={deleteButton}
              onClick={() => handleListDelete(list.listId)}
            />  
          </div>
            {list.tasks.map((task, index) => (
              <div 
                onClick={() => 
                  handleTaskChange(boardId, list.listId, task.taskId, task)
                } 
                key={task.taskId} 
              >
                <Task 
                  taskName={task.taskName} 
                  taskDescription={task.taskDescription}
                  boardId={boardId}
                  id={task.taskId}
                  index={index}
                />
              </div>
            ))}
            {provided.placeholder}
            {/* + 새로운 일 등록 */}
            <ActionButton boardId={boardId} listId={list.listId}/>
        </div>
      )}
    </Droppable>
  )
}

export default List;