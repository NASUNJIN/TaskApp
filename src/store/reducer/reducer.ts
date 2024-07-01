// 흐름
//  Action → Dispatch → Reducer → Store

// Toolkit Reducer  Slice Store Provider react component wrapper


import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";
import { userReducer } from "../slices/userSlice";

const reducer = {
    logger : loggerReducer,
    boards : boardsReducer,
    modal : modalReducer,
    user : userReducer
}

export default reducer;