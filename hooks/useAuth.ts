import axios from "axios";
import apiUrl from "../utils/apiUrl";
import { useSetRecoilState } from "recoil";
import { authState } from "../store";
import { useRouter } from "next/router";

export function useAuth() {
    const setAuth = useSetRecoilState(authState);
    const router = useRouter();

    const checkAuth = () => {
        axios
            .get(`${apiUrl}/api/auth/user`, { withCredentials: true })
            .then(res => {
                const auth = res.data;

                if (auth.status == true) {
                    setAuth({
                        isAuthenticated: true,
                        authUser: auth.user
                    })
                } else {
                    setAuth({
                        isAuthenticated: false,
                        authUser: null
                    });
                }
            })
    }

    return { checkAuth };
}
