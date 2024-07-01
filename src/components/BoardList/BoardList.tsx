import React, { FC, useRef, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import SideForm from './SideForm/SideForm';
import clsx from 'clsx';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import { GoSignOut } from 'react-icons/go';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';

type TBoardListProps = {
  activeBoardId : string;
  setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList : FC<TBoardListProps>= ({ activeBoardId, setActiveBoardId }) => {
  const dispatch = useTypedDispatch();
  const { boardArray } = useTypedSelector(state => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false); // 게시판 눌렀을 경우 변경
  const inputRef = useRef<HTMLInputElement>(null);   // + 클릭했을 때 바로 칠 수 있게 커서 가짐

  // firebase 인증
  const auth = getAuth (app);
  const provider = new GoogleAuthProvider();

  // 로그인 했는지 안했는지
  const { isAuth } = useAuth();
  console.log('isAuth', isAuth);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
    setTimeout(() => { // 타이밍 문제로 사용
      inputRef.current?.focus();  // Ref가 등록 안되었을 때 = null, Ref 등록되었을 경우 포커스
    }, 0);
  }

  // 로그인 누르면 옆에 팝업 뜨게 할꺼임
  const handleLogin = () => {
    signInWithPopup(auth, provider)  // 팝업 이용해서 로그인
    // 로그인 성공했을 경우
    .then(userCredential => {
      console.log(userCredential);
      // 정보를 리덕스 스토어에 넣어줄 꺼임
      dispatch(  // userSlice - setUser
        setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid
        })
      )
    })
    // 로그인 실패할 경우
    .catch((error) => {
      console.error(error);
    })
  }

  // 로그아웃
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {  // 성공할 경우 userdata 초기화
      dispatch(
        removeUser()  // userSlice - removeUser
      )
    })
    .catch((error) => {
      console.error(error)
    })
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
          isFormOpen 
          ? <SideForm inputRef = {inputRef} setIsFormOpen={setIsFormOpen} />
          : <FiPlusCircle className={addButton} onClick={handleClick} />
        }

        {
          isAuth
          ? <GoSignOut className={addButton} onClick={handleSignOut} />  // 로그인했을 때 보여주는 버튼
          : <FiLogIn className={addButton} onClick={handleLogin}/>  // 로그아웃했을 때 보여주는 버튼
        }
      </div>
    </div>
  )
}

export default BoardList