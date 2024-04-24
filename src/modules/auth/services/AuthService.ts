import {http} from "../../../../config";
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
class LessonService {
    async register(data: RegisterProps) {
        const response = await http.post('auth/register', data);
        return response.data;
    }
    async login(data: LoginProps) {
        const response = await http.post('auth/login', data);
        return response.data;
    }

    async logout() {
        const response = await http.post('auth/logout');
        return response.data;
    }

    async getUser(): Promise<User | null>{
        const response = await http.get('auth/profile');
        if(!response.status) return null;
        return response.data;
    }

    async find(id: number): Promise<Lesson | null> {
        const response = await http.get<Lesson>(`lessons/${id}`);
        return response.data;
    }
}

const lessonService = new LessonService();

export default lessonService;