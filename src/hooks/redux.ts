import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();


// ex
// interface Obj<T> {
//     name : {
//         state : {
//             data : 'abcd',
//             loading : false
//         }
//     }
// }

// interface State {  // type
//     state : {
//         data : string,
//         loading : boolean
//     }
// }

// const obj : Obj<State> = {  // 객체
//     name : {
//         state : {
//             data : 'abcd',
//             loading : false
//         }
//     }
// }