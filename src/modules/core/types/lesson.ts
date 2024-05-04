type Lesson = {
    id: number;
    title: string;
    img: string;
    content: string;
    completed: boolean;
}
type FullLesson = {
    id: number;
    img: string;
    completed: boolean;
    translations: LessonTranslation[]
}
type LessonTranslation = {
    language_code: LanguageCode;
    title: string;
    content: string;
}
type LessonTranslationUpdate = {
    translations: {
        [key in LanguageCode]: {
            title: string;
            content: string;
        };
    }
};