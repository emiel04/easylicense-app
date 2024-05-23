import {http} from "../../../../config";

class LanguageService {
    async all() {
        const response = await http.get<Language[]>('lang');
        return response.data;
    }

    async translations(language_code: string) {
        const response = await http.get(`lang/${language_code}`);
        return response.data;
    }
}

const langService = new LanguageService();

export default langService;