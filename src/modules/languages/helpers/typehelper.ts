export const ALL_LANGUAGE_CODES = ['en', 'nl'];

export function toLanguageCode(language: string): LanguageCode {
    if (ALL_LANGUAGE_CODES.includes(language as LanguageCode)) {
        return language as LanguageCode;
    } else {
        return ALL_LANGUAGE_CODES[0] as LanguageCode;
    }
}