import {guestHttp, http} from "../../../../config";
import type {User} from "@/modules/core/types/user";


export type RegisterProps = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export type LoginProps = {
    email: string;
    password: string;
}
class AuthService {
    async register(data: RegisterProps) {
        const response = await guestHttp.post('auth/register', data);
        return response.data;
    }
    async login(data: LoginProps) {
        const response = await guestHttp.post('auth/login', data);
        return response.data;
    }

    async logout() {
        const response = await http.post('auth/logout');
        return response.data;
    }

    async getUser(): Promise<User | null>{
        const response = await guestHttp.get('auth/profile');
        if(!response.status) return null;

        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    }

}

const lessonService = new AuthService();

export default lessonService;