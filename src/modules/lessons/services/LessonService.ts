import {http} from "../../../../config";

class LessonService {
    async all(allLanguages: boolean = false) {
        const path = `lessons${allLanguages ? '?all=true' : ''}`;
        const response = await http.get<Lesson[]>(path);
        return response.data;
    }
}

const lessonService = new LessonService();

export default lessonService;