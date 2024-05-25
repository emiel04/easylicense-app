import {http} from "../../../../config";

class LessonService {
    async all(allLanguages: boolean = false, search: string = '') {
        let path = `lessons?all=${allLanguages}`;
        if (search) {
            path += `&search=${search}`;
        }
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

    async findAll(id: number): Promise<FullLesson> {
        const response = await http.get<FullLesson>(`lessons/${id}?all=true`);
        return response.data;
    }

    async update(id: number, data: LessonTranslationUpdate): Promise<FullLesson> {
        const response = await http.patch(`admin/lessons/${id}`, data);
        return response.data;
    }

    async create(data: LessonTranslationUpdate) {
        const response = await http.post(`admin/lessons/`, {...data, category_id: 1}); // IMPLEMENT CATEGORIES< NOW DEFAULT TO 1
        return response.data;
    }

    async delete(id: number) {
        const response = await http.delete(`admin/lessons/${id}`);
        return response.data;
    }
}

const lessonService = new LessonService();

export default lessonService;