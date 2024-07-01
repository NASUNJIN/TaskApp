import { useTypedSelector } from "./redux";

export function useAuth() {

    const { id, email } = useTypedSelector((state) => state.user);

    return {
        isAuth: !!email,  // email이 있을 경우
        email,
        id
    };
}