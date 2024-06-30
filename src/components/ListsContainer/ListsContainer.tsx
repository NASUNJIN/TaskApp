import React, { FC } from 'react'
import { IList } from '../../types';
import List from '../List/List';
import ActionButton from '../ActionButton/ActionButton';
import { listsContainer } from './ListsContainer.css';

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}

const ListsContainer: FC<TListsContainerProps> = ({ lists,boardId }) => {
  return (
    <div className={listsContainer}>
      {
        lists.map((list) => (
          <List key={list.listId} list={list} boardId={boardId} />
        ))
      }
      {/* + 새로운 리스트 등록 버튼 */}
      <ActionButton boardId={boardId} listId={""} list/>  {/*list 이용해 어디서 가져 오는지 다룸*/}
    </div>
  )
}

export default ListsContainer