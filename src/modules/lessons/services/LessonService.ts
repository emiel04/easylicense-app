import {http} from "../../../../config";

class LessonService {
    async all(lang?: string) {
        let path = "lessons";
        if (lang) {
            path += `?lang=${lang}`;
        }
        const response = await http.get<Lesson[]>(path);
        return response.data;
    }
}

const lessonService = new LessonService();

export default lessonService;