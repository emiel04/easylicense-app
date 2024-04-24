import {http} from "../../../../config";


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
}

const lessonService = new LessonService();

export default lessonService;