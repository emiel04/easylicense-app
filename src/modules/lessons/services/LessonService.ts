import {http} from "../../../../config";

class LessonService {
    async all(allLanguages: boolean = false) {
        const path = `lessons${allLanguages ? '?all=true' : ''}`;
        const response = await http.get<Lesson[]>(path);
        return response.data;
    }

    async find(id: number): Promise<Lesson | null> {
        const response = await http.get<Lesson>(`lessons/${id}`);
        return response.data;
    }
    async setLessonComplete(lesson_id: number, completed: boolean) {
        const response = await http.patch(`progressions/${lesson_id}`, {completed});
        return response.data;
    }
}

const lessonService = new LessonService();

export default lessonService;