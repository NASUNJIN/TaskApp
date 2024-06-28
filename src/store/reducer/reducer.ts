// 흐름
//  Action → Dispatch → Reducer → Store

// Toolkit   Reducer   Slice Store Provider react component wrapper


import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
    logger : loggerReducer,
    boards : boardsReducer,
    modal : modalReducer
}

export default reducer;